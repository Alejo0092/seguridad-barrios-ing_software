## ADR-001 · Interfaz web/móvil con React

- **Estado:** Aceptada
- **Fecha:** 13/10/2026 (formalizada en esta entrega)
- **Decisores:** Carlos Felipe Feria Chaparro, Alejandro Yepes Bedoya

**Contexto.** El sistema necesita una interfaz responsive que muestre cámaras en vivo (HU-03), chat en tiempo real (HU-04), un mapa interactivo (HU-10) y paneles distintos por rol (HU-13). Debe funcionar en navegador de escritorio y celular sin desarrollar dos aplicaciones.

**Decisión.** Construir la interfaz como una aplicación de una sola página (SPA) con **React**, servida como contenido estático y conectada al API por HTTPS y WebSocket.

**Alternativas descartadas.**
- **Vue 3:** puntaje cercano (22/30 frente a 25/30), pero el equipo tiene menos práctica y hay menos ejemplos con mapas y video en tiempo real.
- **Angular:** curva de aprendizaje más alta y estructura pesada para un equipo de dos personas.

**Consecuencias positivas.**
- Componentes reutilizables entre módulos (tarjetas de alerta, listas, formularios).
- Gran ecosistema de librerías de mapas, gráficos y WebSocket, y mucha documentación.

**Consecuencias negativas.**
- Hay que elegir y mantener librerías adicionales (enrutador, manejo de estado), que React no trae incluidas.
- El prototipo actual no usa React (ver ADR-006), por lo que habrá un costo de migración (deuda D-01).
