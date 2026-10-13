# 4. Plan de pruebas

## 4.1 Qué se prueba en cada nivel de la pirámide

| Nivel | Qué se prueba | Herramienta | Cantidad | Cuándo se ejecuta |
|---|---|---|---|---|
| Unitarias (base) | Reglas de negocio puras de `js/logica.js`: permisos por rol, ciclo de la alerta, validación de incidentes y evidencias, hash SHA-256, reintentos de envío, escape de HTML | `node:test` (incluido en Node) | 18 (UT-01 a UT-18) | En cada push (CI) y en local con `npm test` |
| Integración (medio) | La interfaz completa (`index.html` + `js/*.js`) sobre un DOM simulado: login por rol, chat, emergencia, reintentos, gestión de alertas e incidentes | `node:test` + `jsdom` | 10 (IT-01 a IT-10) | En cada push (CI) y en local con `npm test` |
| Aceptación manual (cima) | Recorridos completos en un navegador real, incluyendo lo visual (mapa, cámaras, responsive) | Lista de verificación con Live Server | 8 (M-01 a M-08) | Antes de cada demostración |

La pirámide tiene más pruebas en la base (rápidas y baratas) que en la cima (lentas y manuales).

## 4.2 Criterios de aceptación (Dado / Cuando / Entonces) y las pruebas que los verifican

Los criterios están redactados a partir de las historias del backlog. Si las tarjetas de Trello tienen criterios propios, se reemplaza solo el texto: los IDs de prueba no cambian.

| ID | HU | Dado | Cuando | Entonces | Pruebas |
|---|---|---|---|---|---|
| CA-01 | HU-13 | Un usuario con rol Residente | inicia sesión | ve cinco módulos y no ve el Historial | UT-02, IT-01 |
| CA-02 | HU-13, HU-11 | Un Responsable de Seguridad o Administrador | inicia sesión | ve los seis módulos, incluido el Historial | UT-03, IT-02 |
| CA-03 | HU-04 | Un residente en el chat | envía un mensaje con código HTML | el texto se muestra tal cual y no se ejecuta | UT-01, IT-04 |
| CA-04 | HU-09 | Un residente autenticado | confirma la emergencia | se crea una alerta ACTIVA de nivel ALTO y el responsable recibe el aviso en menos de 5 s | UT-08, IT-05 |
| CA-05 | HU-05 | Un envío de notificación que falla | el sistema reintenta | hace hasta 3 reintentos y informa si se logró o no | UT-15, UT-16, UT-17, UT-18, IT-06 |
| CA-06 | HU-14 | Una alerta ACTIVA | el responsable la atiende y luego la cierra | pasa de ACTIVA a EN_ATENCION y luego a ATENDIDA | UT-05, UT-06, IT-07 |
| CA-07 | HU-13, HU-14 | Un residente con una alerta | revisa su lista de alertas | no tiene botones para atenderla o cerrarla | UT-04, IT-08 |
| CA-08 | HU-08 | Un reporte sin descripción | se intenta enviar | no se crea y se pide describir el incidente | UT-09, IT-09 |
| CA-09 | HU-08 | Un incidente reportado | el responsable cambia su nivel de riesgo | queda con el nivel elegido y se rechazan niveles inválidos | UT-10, UT-11, IT-10 |
| CA-10 | HU-15 | Una foto o video adjunto a un incidente | se guarda la evidencia | se calcula su SHA-256 y un cambio de un byte se detecta | UT-13, UT-14 |
| CA-11 | HU-15 | Un archivo que no es foto ni video, o de más de 25 MB | se intenta adjuntar | se rechaza con un mensaje claro | UT-12 |
| CA-12 | HU-11 | Un usuario que inicia sesión | el responsable abre el Historial | la acción aparece registrada | IT-03 |

## 4.3 Pruebas implementadas

**Unitarias (18).** UT-01 escape de HTML · UT-02 residente sin Historial · UT-03 responsable y administrador con Historial · UT-04 quién puede clasificar · UT-05 ciclo de la alerta · UT-06 estado inválido · UT-07 umbrales de riesgo · UT-08 creación de alerta · UT-09 incidente sin descripción · UT-10 riesgo por defecto · UT-11 niveles válidos · UT-12 formato y tamaño de evidencia · UT-13 vectores conocidos de SHA-256 · UT-14 detección de alteración · UT-15 envío inmediato · UT-16 recuperación en reintento · UT-17 fallo tras 3 reintentos · UT-18 aviso de cada reintento.

**Integración (10).** IT-01 y IT-02 módulos por rol · IT-03 historial del inicio de sesión · IT-04 chat sin inyección · IT-05 emergencia en menos de 5 s · IT-06 emergencia con reintento · IT-07 responsable atiende y cierra · IT-08 residente sin gestión de alertas · IT-09 incidente con y sin descripción · IT-10 selector de riesgo según rol.

**Aceptación manual (8).** M-01 login por rol · M-02 mapa y capas · M-03 cámaras (una sin conexión, reloj en movimiento) · M-04 chat y avisos del administrador · M-05 emergencia y tiempo · M-06 incidente con foto, hash e integridad (usar Live Server o HTTPS) · M-07 responsable atiende alerta y clasifica incidente · M-08 vista en celular.

## 4.4 Resultados y pruebas planeadas

- **Última ejecución local (12/10/2026, Node 22):** 28 pruebas, 28 aprobadas, 0 fallidas.
- **Defectos hallados al escribir las pruebas (ya corregidos):** el Residente veía el módulo Historial por una comparación de texto incorrecta; el chat y los incidentes no escapaban el HTML; el envío de la emergencia siempre terminaba «exitoso» aunque fallaran los reintentos; la etiqueta «integridad verificada» era fija y ahora se calcula.
- **Planeadas, aún no implementadas:** prueba de carga de 200 usuarios concurrentes por barrio (RNF-06), pruebas end-to-end automáticas en navegador, análisis de seguridad con OWASP ZAP y pruebas de contrato del API cuando exista el backend (deuda D-07).

## 4.5 Evidencia del pipeline de CI

El archivo `.github/workflows/ci.yml` instala las dependencias, revisa la sintaxis y ejecuta las 28 pruebas en cada push y pull request.

**Estado del pipeline:** [COMPLETAR tras subir el código: pegar aquí la captura de la pestaña *Actions* de GitHub con la ejecución en verde].
