# 2. Decisiones de arquitectura (ADR)

Se documentan **seis** decisiones con el formato: título, estado, contexto, decisión (con las alternativas descartadas) y consecuencias, incluyendo las negativas. Cada ADR es un archivo editable en `docs/adr/`.

| ADR | Decisión | Estado |
|---|---|---|
| ADR-001 | Interfaz web/móvil con React | Aceptada |
| ADR-002 | API Backend con Node.js (REST + WebSocket) | Aceptada |
| ADR-003 | Persistencia con PostgreSQL y Redis | Aceptada |
| ADR-004 | Notificaciones asíncronas con cola y worker | Aceptada |
| ADR-005 | Evidencias en almacenamiento de objetos cifrado con hash SHA-256 | Aceptada |
| ADR-006 | Prototipo en HTML, CSS y JavaScript puro | Aceptada (temporal) |

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

## ADR-003 · Persistencia con PostgreSQL y Redis

- **Estado:** Aceptada
- **Fecha:** 13/10/2026 (formalizada en esta entrega)
- **Decisores:** Carlos Felipe Feria Chaparro, Alejandro Yepes Bedoya

**Contexto.** El modelo de clases tiene relaciones fuertes (Usuario–Rol–Permiso, Incidente–Evidencia–Alerta–Notificación) y se requieren consultas agregadas por fechas, tipo y zona (HU-12), además de datos georreferenciados (HU-08, HU-10).

**Decisión.** Usar **PostgreSQL** como base de datos principal y **Redis** para datos temporales (sesiones y mensajes en tiempo real).

**Alternativas descartadas.**
- **MongoDB:** flexible, pero las relaciones y los reportes agregados del dominio se resuelven mejor con SQL y claves foráneas.
- **MySQL:** cumple, pero PostgreSQL ofrece mejor soporte geoespacial (extensión PostGIS) para las capas del mapa.

**Consecuencias positivas.**
- Integridad referencial y transacciones: una alerta no puede quedar sin su emergencia.
- Consultas SQL para reportes y mapas de calor sin código adicional.

**Consecuencias negativas.**
- Escalar horizontalmente es más complejo que con una base NoSQL.
- Redis agrega un componente más que desplegar, vigilar y respaldar.

## ADR-004 · Notificaciones asíncronas con cola y worker

- **Estado:** Aceptada
- **Fecha:** 13/10/2026 (formalizada en esta entrega)
- **Decisores:** Carlos Felipe Feria Chaparro, Alejandro Yepes Bedoya

**Contexto.** Una emergencia debe llegar al responsable en menos de 5 segundos (RNF-02) y, si el proveedor de SMS o push falla, el sistema debe reintentar hasta 3 veces (RNF-10) sin dejar al residente esperando.

**Decisión.** El API registra la alerta y **encola** el evento; un **worker interno** lo procesa, llama al proveedor externo y gestiona los reintentos.

**Alternativas descartadas.**
- **Envío síncrono dentro de la petición:** simple, pero una caída del proveedor bloquearía la respuesta al residente.
- **Consulta periódica (polling) desde el cliente:** retrasa la alerta y gasta recursos.

**Consecuencias positivas.**
- Desacopla la creación de la alerta de su entrega; los reintentos no afectan al usuario.
- Permite priorizar las alertas críticas en la cola.

**Consecuencias negativas.**
- Más complejidad operativa: hay que desplegar y monitorear la cola y el worker.
- Consistencia eventual: la alerta existe antes de que se confirme su envío; hay que evitar duplicados (idempotencia).

## ADR-005 · Evidencias en almacenamiento de objetos cifrado con hash SHA-256

- **Estado:** Aceptada
- **Fecha:** 13/10/2026 (formalizada en esta entrega)
- **Decisores:** Carlos Felipe Feria Chaparro, Alejandro Yepes Bedoya

**Contexto.** La gestión de evidencias (HU-15) exige custodia digital: fotos y videos de incidentes que no deben alterarse ni perderse, y que el responsable pueda verificar.

**Decisión.** Guardar los archivos en **almacenamiento de objetos cifrado** (tipo S3) y registrar en PostgreSQL sus metadatos junto con el **hash SHA-256** calculado al cargarlos, para comprobar su integridad después.

**Alternativas descartadas.**
- **Archivos como BLOB en PostgreSQL:** simplifica el despliegue, pero infla la base de datos y encarece los respaldos.
- **Carpeta en el servidor de aplicaciones:** se pierde al reemplazar el contenedor y no escala.

**Consecuencias positivas.**
- Integridad demostrable: cualquier cambio de un byte cambia el hash (probado en UT-14).
- La base de datos se mantiene liviana y los archivos escalan de forma independiente.

**Consecuencias negativas.**
- Costo recurrente de almacenamiento y dependencia de un proveedor en la nube.
- Hay que gestionar enlaces firmados y permisos de acceso, y cumplir la normativa de datos personales.

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

