// PRUEBAS DE INTEGRACIÓN: index.html + js/*.js trabajando juntos sobre un DOM simulado (jsdom)
const test = require("node:test");
const assert = require("node:assert/strict");
const { abrir, esperar } = require("../_support/ui");

test("IT-01 Residente ve 5 módulos y no ve Historial (HU-13)", async () => {
  const ui = await abrir(); ui.entrar("res");
  const ids = ui.$$(".nv").map(b => b.dataset.id);
  assert.equal(ids.length, 5);
  assert.equal(ids.includes("hist"), false);
  assert.equal(ui.vistaVisible(), "v-mapa");
  ui.cerrar();
});
test("IT-02 Responsable de Seguridad ve los 6 módulos incluido Historial (HU-13)", async () => {
  const ui = await abrir(); ui.entrar("resp");
  assert.equal(ui.$$(".nv").length, 6);
  assert.ok(ui.$$(".nv").some(b => b.dataset.id === "hist"));
  ui.cerrar();
});
test("IT-03 el historial registra el inicio de sesión (HU-11)", async () => {
  const ui = await abrir(); ui.entrar("adm");
  assert.match(ui.$("#hl").textContent, /Inicio de sesión como Administrador/);
  ui.cerrar();
});
test("IT-04 el chat muestra el texto con HTML como texto plano, sin inyectar elementos (HU-04, riesgo R-010)", async () => {
  const ui = await abrir(); ui.entrar("res");
  ui.$("#mi").value = '<img src=x onerror="window.hackeado=1"><b>hola</b>';
  ui.$("#ms").click();
  assert.equal(ui.$("#msgs img"), null);
  assert.equal(ui.$("#msgs b"), null);
  assert.match(ui.$("#msgs").textContent, /<img src=x/);
  assert.equal(ui.window.hackeado, undefined);
  ui.cerrar();
});
test("IT-05 emergencia: crea alerta ACTIVA y notifica en menos de 5 s (HU-09, RNF-02)", { timeout: 15000 }, async () => {
  const ui = await abrir({ random: () => 0.9 }); ui.entrar("res");
  ui.$("#pb").click(); assert.equal(ui.$("#cf").classList.contains("hide"), false);
  ui.$("#cy").click(); await esperar(2300);
  assert.match(ui.$("#als").textContent, /AL-101/);
  assert.match(ui.$("#als").textContent, /ACTIVA/);
  const seg = parseFloat(ui.$("#steps").textContent.match(/en ([\d.]+) s/)[1]);
  assert.ok(seg < 5, `tardó ${seg} s`);
  ui.cerrar();
});
test("IT-06 emergencia: ante un fallo de envío reintenta y se recupera (RNF-10)", { timeout: 15000 }, async () => {
  const ui = await abrir({ random: () => 0.1 }); ui.entrar("res");
  ui.$("#cy").click(); await esperar(2800);
  assert.match(ui.$("#steps").textContent, /reintento 1 de 3/);
  assert.match(ui.$("#steps").textContent, /SMS y push enviados/);
  ui.cerrar();
});
test("IT-07 el Responsable atiende y cierra la alerta (HU-14)", { timeout: 15000 }, async () => {
  const ui = await abrir({ random: () => 0.9 }); ui.entrar("resp");
  ui.$("#cy").click(); await esperar(2300);
  ui.$("[data-a]").click(); assert.match(ui.$("#als").textContent, /EN ATENCION/);
  ui.$("[data-a]").click(); assert.match(ui.$("#als").textContent, /ATENDIDA/);
  assert.equal(ui.$("[data-a]"), null);
  ui.cerrar();
});
test("IT-08 el Residente no puede cerrar alertas (sin botones de gestión) (HU-13)", { timeout: 15000 }, async () => {
  const ui = await abrir({ random: () => 0.9 }); ui.entrar("res");
  ui.$("#cy").click(); await esperar(2300);
  assert.equal(ui.$("[data-a]"), null);
  ui.cerrar();
});
test("IT-09 reporte de incidente: sin descripción no se crea; con descripción aparece (HU-08)", async () => {
  const ui = await abrir(); ui.entrar("res");
  ui.$("#id").value = "  "; ui.$("#isb").click(); await esperar(50);
  assert.match(ui.$("#ils").textContent, /Aún no hay reportes/);
  ui.$("#id").value = "Persona sospechosa en la portería"; ui.$("#isb").click(); await esperar(50);
  assert.match(ui.$("#ils").textContent, /IN-1/);
  ui.cerrar();
});
test("IT-10 solo Responsable/Administrador ven el selector de riesgo del incidente (HU-08, HU-13)", async () => {
  const res = await abrir(); res.entrar("res");
  res.$("#id").value = "Ruido"; res.$("#isb").click(); await esperar(50);
  assert.equal(res.$("[data-r]"), null); res.cerrar();
  const resp = await abrir(); resp.entrar("resp");
  resp.$("#id").value = "Ruido"; resp.$("#isb").click(); await esperar(50);
  assert.ok(resp.$("[data-r]")); resp.cerrar();
});
