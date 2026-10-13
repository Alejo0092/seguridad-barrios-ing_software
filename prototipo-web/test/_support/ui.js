// Carga index.html en jsdom con sus scripts (sin red) para pruebas de integración.
const path = require("node:path");
const { webcrypto } = require("node:crypto");
const { JSDOM, ResourceLoader } = require("jsdom");

class SoloArchivosLocales extends ResourceLoader {
  fetch(url, options) { return url.startsWith("file:") ? super.fetch(url, options) : null; } // ignora Google Fonts
}

async function abrir({ random = () => 0.9 } = {}) {
  const dom = await JSDOM.fromFile(path.join(__dirname, "../../index.html"), {
    runScripts: "dangerously", resources: new SoloArchivosLocales(), pretendToBeVisual: true,
    beforeParse(w) { w.Math.random = random; w.crypto = webcrypto; }
  });
  await new Promise(r => dom.window.addEventListener("load", r));
  const d = dom.window.document;
  return {
    window: dom.window, d, $: s => d.querySelector(s), $$: s => [...d.querySelectorAll(s)],
    entrar(rol) { d.querySelector("#rl").value = rol; d.querySelector("#go").click(); },
    vistaVisible() { return [...d.querySelectorAll(".view")].find(v => !v.classList.contains("hide")).id; },
    cerrar() { dom.window.close(); }
  };
}
const esperar = ms => new Promise(r => setTimeout(r, ms));
module.exports = { abrir, esperar };
