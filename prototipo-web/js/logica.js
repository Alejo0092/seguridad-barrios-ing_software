/* LÓGICA PURA (sin DOM): reglas del negocio que se pueden probar con Node.
   La usan la interfaz (js/*.js) y las pruebas (test/). */
const Logica = (() => {
  const ROLES = { res: "Residente", resp: "Responsable de Seguridad", adm: "Administrador" };
  // [id, etiqueta, ícono, roles con acceso (HU-13)]
  const NAV = [["mapa","Mapa","🗺️","res resp adm"],["camaras","Cámaras","📹","res resp adm"],["chat","Chat","💬","res resp adm"],
    ["emerg","Emergencias","🚨","res resp adm"],["inc","Incidentes","📝","res resp adm"],["hist","Historial","🕘","resp adm"]];
  const ESTADOS = ["ACTIVA", "EN_ATENCION", "ATENDIDA"];
  const NIVELES = ["BAJO", "MEDIO", "ALTO"];
  const MAX_EVIDENCIA_BYTES = 25 * 1024 * 1024; // supuesto de diseño: 25 MB

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const modulosPorRol = rol => NAV.filter(n => n[3].split(" ").includes(rol));
  const puedeClasificar = rol => rol === "resp" || rol === "adm";

  const siguienteEstado = e => {
    const i = ESTADOS.indexOf(e);
    if (i < 0) throw new Error("Estado inválido: " + e);
    return ESTADOS[Math.min(i + 1, ESTADOS.length - 1)];
  };
  // Misma regla que la matriz de riesgos (Probabilidad × Impacto)
  const nivelRiesgo = (p, i) => { const s = p * i; return s >= 16 ? "Crítico" : s >= 10 ? "Alto" : s >= 5 ? "Medio" : "Bajo"; };

  const crearAlerta = (alertas, hora) => ({ id: "AL-" + (alertas.length + 101), n: "ALTO", e: "ACTIVA", h: hora });
  const crearIncidente = (incs, { tipo, descripcion, ubicacion, archivo }) => {
    const d = String(descripcion || "").trim();
    if (!d) return null;
    return { id: "IN-" + (incs.length + 1), t: tipo, d, u: ubicacion, r: "MEDIO", f: archivo || null };
  };
  const clasificar = (inc, nivel) => {
    if (!NIVELES.includes(nivel)) throw new Error("Nivel inválido: " + nivel);
    inc.r = nivel; return inc;
  };

  const validarEvidencia = ({ type, size }) => {
    if (!/^(image|video)\//.test(type || "")) return { ok: false, motivo: "Formato no permitido (solo foto o video)" };
    if (size > MAX_EVIDENCIA_BYTES) return { ok: false, motivo: "Archivo demasiado grande (máx. 25 MB)" };
    return { ok: true };
  };
  async function sha256Hex(buf) {
    const h = await globalThis.crypto.subtle.digest("SHA-256", buf);
    return [...new Uint8Array(h)].map(x => x.toString(16).padStart(2, "0")).join("");
  }
  async function verificarIntegridad(buf, hashEsperado) { return (await sha256Hex(buf)) === hashEsperado; }

  // Envío inicial + hasta `max` reintentos (RNF-10). intento(n) devuelve true si se envió.
  async function enviarConReintentos(intento, max = 3, onFallo) {
    for (let n = 0; n <= max; n++) {
      if (await intento(n)) return { ok: true, reintentos: n };
      if (n < max && onFallo) onFallo(n + 1);
    }
    return { ok: false, reintentos: max };
  }

  return { ROLES, NAV, esc, modulosPorRol, puedeClasificar, siguienteEstado, nivelRiesgo, crearAlerta, crearIncidente,
    clasificar, validarEvidencia, sha256Hex, verificarIntegridad, enviarConReintentos };
})();
if (typeof module !== "undefined") module.exports = Logica;
