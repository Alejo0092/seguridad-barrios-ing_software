## ADR-006 · Prototipo de demostración en HTML, CSS y JavaScript puro

- **Estado:** Aceptada (temporal, hasta migrar al stack objetivo)
- **Fecha:** 13/10/2026 (formalizada en esta entrega)
- **Decisores:** Carlos Felipe Feria Chaparro, Alejandro Yepes Bedoya

**Contexto.** Se necesitaba mostrar en pocos días una versión navegable del sistema, que cualquiera pueda abrir sin instalar herramientas ni servidores.

**Decisión.** Construir el prototipo con **HTML, CSS y JavaScript puro**, sin framework ni backend, y aislar las reglas de negocio en `js/logica.js` para poder probarlas con Node y reutilizarlas.

**Alternativas descartadas.**
- **Prototipo directamente en React + Node:** más fiel al objetivo, pero con mucho más tiempo de configuración que de valor para la demostración.
- **Maquetas estáticas (imágenes o Figma):** no permiten demostrar los flujos (emergencia, reintentos, roles).

**Consecuencias positivas.**
- Se abre con doble clic o con Live Server; cero dependencias en producción.
- La lógica pura tiene 18 pruebas unitarias y se puede migrar sin reescribirla.

**Consecuencias negativas.**
- El prototipo se desvía del stack de las ADR-001 y ADR-002: la capa de vista habrá que reescribirla (deuda D-01).
- Los datos viven en memoria y se pierden al recargar (deuda D-02).
