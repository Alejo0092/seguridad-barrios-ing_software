# 6. Registro de deuda técnica

Se identificaron **ocho deudas**, clasificadas en el cuadrante de Martin Fowler (deliberada o inadvertida × prudente o imprudente). Los costos son estimaciones del equipo en horas de trabajo y deben validarse al planificar cada sprint.

## 6.1 Cuadrante

| | **Prudente** | **Imprudente** |
|---|---|---|
| **Deliberada** | D-01 Prototipo fuera del stack objetivo · D-02 Sin backend ni persistencia · D-06 Scripts globales acoplados al DOM · D-07 Sin pruebas E2E ni de carga · D-08 Fuentes desde un CDN | D-03 Autorización solo en el cliente |
| **Inadvertida** | D-05 Comparación de roles con `includes` (corregida) | D-04 HTML sin escapar, riesgo de XSS (corregida) |

## 6.2 Registro

| ID | Deuda | Cuadrante | Costo estimado | Plan de pago | Estado |
|---|---|---|---|---|---|
| D-01 | El prototipo usa JavaScript puro, no React ni Node (ADR-001, ADR-002) | Deliberada / Prudente | 40 h | Migrar módulo por módulo a React (login y emergencias primero) reutilizando `js/logica.js` y sus pruebas | Pendiente |
| D-02 | Sin backend: datos en memoria y login simulado | Deliberada / Prudente | 60 h | Crear el API Express con PostgreSQL y autenticación con JWT, empezando por HU-01 y HU-13 | Pendiente |
| D-03 | Los roles solo se validan en el navegador y se pueden saltar | Deliberada / Imprudente | 16 h | Validar JWT y rol en cada endpoint del backend, con pruebas de contrato. No reutilizar este código con datos reales | Pendiente |
| D-04 | El chat y los incidentes insertaban el texto del usuario como HTML (R-010) | Inadvertida / Imprudente | 3 h | Escapar toda salida con `esc()` y probar con UT-01 e IT-04 | Pagada |
| D-05 | La comparación de roles con `includes` daba acceso al Historial al Residente | Inadvertida / Prudente | 1 h | Comparar roles exactos y probar con UT-02 e IT-01 | Pagada |
| D-06 | Funciones y estado globales; los scripts dependen del orden de carga | Deliberada / Prudente | 12 h | Se separó la lógica pura (`js/logica.js`); el resto se resuelve al migrar a módulos con React | Parcial |
| D-07 | No hay pruebas E2E automáticas ni de carga (RNF-06) | Deliberada / Prudente | 20 h | Agregar Playwright para los flujos principales y k6 para 200 usuarios concurrentes | Pendiente |
| D-08 | Las fuentes se cargan desde Google Fonts | Deliberada / Prudente | 1 h | Alojar las fuentes en el proyecto | Pendiente |

**Costo pendiente:** 40 + 60 + 16 + 20 + 1 = 137 h, más 12 h de D-06 que se resuelven dentro de D-01. **Pagadas:** D-04 y D-05 (4 h), y D-06 en parte.

**Prioridad de pago:** primero D-03 (seguridad), luego D-02 (permite datos reales) y D-01 (alinea el código con la arquitectura documentada).
