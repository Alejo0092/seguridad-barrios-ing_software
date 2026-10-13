// PRUEBAS UNITARIAS de js/logica.js (base de la pirámide). Cada ID se referencia en docs/plan-de-pruebas.md
const test = require("node:test");
const assert = require("node:assert/strict");
const L = require("../../js/logica.js");

test("UT-01 esc neutraliza etiquetas HTML y comillas (riesgo R-010, XSS)", () => {
  assert.equal(L.esc('<img src=x onerror="alert(1)">'), "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
  assert.equal(L.esc("Tom & 'Jerry'"), "Tom &amp; &#39;Jerry&#39;");
});
test("UT-02 el Residente NO ve el módulo Historial (HU-13, regresión de bug)", () => {
  const ids = L.modulosPorRol("res").map(n => n[0]);
  assert.equal(ids.includes("hist"), false);
  assert.equal(ids.length, 5);
});
test("UT-03 Responsable y Administrador sí ven Historial (HU-11, HU-13)", () => {
  for (const r of ["resp", "adm"]) assert.equal(L.modulosPorRol(r).map(n => n[0]).includes("hist"), true);
});
test("UT-04 solo Responsable y Administrador pueden clasificar (HU-08)", () => {
  assert.equal(L.puedeClasificar("res"), false);
  assert.equal(L.puedeClasificar("resp"), true);
  assert.equal(L.puedeClasificar("adm"), true);
});
test("UT-05 ciclo de la alerta ACTIVA → EN_ATENCION → ATENDIDA y se mantiene (HU-14)", () => {
  assert.equal(L.siguienteEstado("ACTIVA"), "EN_ATENCION");
  assert.equal(L.siguienteEstado("EN_ATENCION"), "ATENDIDA");
  assert.equal(L.siguienteEstado("ATENDIDA"), "ATENDIDA");
});
test("UT-06 estado inválido de alerta lanza error", () => {
  assert.throws(() => L.siguienteEstado("INVENTADO"), /Estado inválido/);
});
test("UT-07 nivelRiesgo respeta los umbrales de la matriz de riesgos", () => {
  const casos = [[1, 1, "Bajo"], [2, 2, "Bajo"], [1, 5, "Medio"], [3, 3, "Medio"], [2, 5, "Alto"], [3, 5, "Alto"], [4, 4, "Crítico"], [4, 5, "Crítico"]];
  for (const [p, i, esperado] of casos) assert.equal(L.nivelRiesgo(p, i), esperado, `${p}x${i}`);
});
test("UT-08 crearAlerta: id incremental, nivel ALTO y estado ACTIVA (HU-09)", () => {
  const a1 = L.crearAlerta([], "10:00");
  assert.deepEqual(a1, { id: "AL-101", n: "ALTO", e: "ACTIVA", h: "10:00" });
  assert.equal(L.crearAlerta([a1], "10:05").id, "AL-102");
});
test("UT-09 crearIncidente rechaza descripción vacía o solo espacios (HU-08)", () => {
  assert.equal(L.crearIncidente([], { tipo: "Robo", descripcion: "   ", ubicacion: "x" }), null);
  assert.equal(L.crearIncidente([], { tipo: "Robo", ubicacion: "x" }), null);
});
test("UT-10 crearIncidente asigna riesgo MEDIO por defecto e id consecutivo", () => {
  const i = L.crearIncidente([{}], { tipo: "Robo", descripcion: " Se llevaron una bici ", ubicacion: "Cra 5" });
  assert.equal(i.id, "IN-2");
  assert.equal(i.r, "MEDIO");
  assert.equal(i.d, "Se llevaron una bici");
});
test("UT-11 clasificar acepta BAJO/MEDIO/ALTO y rechaza otros valores", () => {
  const inc = { r: "MEDIO" };
  assert.equal(L.clasificar(inc, "ALTO").r, "ALTO");
  assert.throws(() => L.clasificar(inc, "EXTREMO"), /Nivel inválido/);
});
test("UT-12 validarEvidencia acepta foto/video y rechaza otros formatos o >25 MB (HU-15)", () => {
  assert.equal(L.validarEvidencia({ type: "image/png", size: 1000 }).ok, true);
  assert.equal(L.validarEvidencia({ type: "video/mp4", size: 5e6 }).ok, true);
  assert.equal(L.validarEvidencia({ type: "application/pdf", size: 1000 }).ok, false);
  assert.equal(L.validarEvidencia({ type: "image/jpeg", size: 26 * 1024 * 1024 }).ok, false);
});
test("UT-13 sha256Hex coincide con vectores conocidos del estándar (HU-15)", async () => {
  assert.equal(await L.sha256Hex(new TextEncoder().encode("abc")), "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
  assert.equal(await L.sha256Hex(new Uint8Array()), "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
});
test("UT-14 verificarIntegridad detecta la alteración de un solo byte (HU-15)", async () => {
  const original = new TextEncoder().encode("foto-evidencia");
  const hash = await L.sha256Hex(original);
  assert.equal(await L.verificarIntegridad(original, hash), true);
  const alterado = new Uint8Array(original); alterado[0] ^= 1;
  assert.equal(await L.verificarIntegridad(alterado, hash), false);
});
test("UT-15 enviarConReintentos: éxito inmediato, 0 reintentos", async () => {
  assert.deepEqual(await L.enviarConReintentos(async () => true), { ok: true, reintentos: 0 });
});
test("UT-16 enviarConReintentos: se recupera en el reintento 2 (RNF-10)", async () => {
  assert.deepEqual(await L.enviarConReintentos(async n => n === 2), { ok: true, reintentos: 2 });
});
test("UT-17 enviarConReintentos: falla tras 3 reintentos (RNF-10)", async () => {
  let llamadas = 0;
  const r = await L.enviarConReintentos(async () => { llamadas++; return false; }, 3);
  assert.deepEqual(r, { ok: false, reintentos: 3 });
  assert.equal(llamadas, 4); // 1 intento inicial + 3 reintentos
});
test("UT-18 enviarConReintentos avisa cada reintento (1, 2, 3)", async () => {
  const avisos = [];
  await L.enviarConReintentos(async () => false, 3, n => avisos.push(n));
  assert.deepEqual(avisos, [1, 2, 3]);
});
