## ADR-002 · API Backend con Node.js (REST + WebSocket)

- **Estado:** Aceptada
- **Fecha:** 13/10/2026 (formalizada en esta entrega)
- **Decisores:** Carlos Felipe Feria Chaparro, Alejandro Yepes Bedoya

**Contexto.** El backend atiende peticiones REST (usuarios, incidentes, alertas, evidencias) y mantiene conexiones persistentes para el chat y las alertas en vivo. Debe notificar al responsable de seguridad en menos de 5 segundos (RNF-02) y soportar 200 usuarios concurrentes por barrio (RNF-06).

**Decisión.** Implementar el API con **Node.js** (REST + WebSocket), con la validación de sesión y roles centralizada en el backend.

**Alternativas descartadas.**
- **Python con FastAPI:** buena opción, pero menor dominio del equipo y obliga a duplicar modelos y validaciones respecto al frontend.
- **Java con Spring Boot:** robusto y escalable, pero con más configuración y mayor curva de aprendizaje para el tiempo disponible.

**Consecuencias positivas.**
- Un solo lenguaje (JavaScript) en frontend y backend: se puede reutilizar lógica, como `js/logica.js` del prototipo.
- El modelo asíncrono encaja con tareas de entrada/salida (chat, notificaciones, cámaras).

**Consecuencias negativas.**
- Las tareas que consumen mucho CPU (estadísticas, mapas de calor, HU-12) pueden bloquear el hilo principal y requieren un worker aparte.
- JavaScript sin tipos facilita errores; se recomienda adoptar TypeScript más adelante.
