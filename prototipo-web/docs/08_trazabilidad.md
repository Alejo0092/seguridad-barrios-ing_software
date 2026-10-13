# 8. Tabla de trazabilidad

Conecta cada historia del backlog con el modelo donde aparece, la prueba que la verifica y el módulo o archivo del código. Los IDs de prueba (UT-xx, IT-xx, M-xx) están descritos en la sección 4.

| HU | Historia | Modelo donde aparece | Prueba que la verifica | Módulo / archivo del código | Estado |
|---|---|---|---|---|---|
| HU-01 | Registro de usuario | Casos de uso: Registrarse; Clases: Residente.registrarse() | —  (sin pruebas: no implementada) | No implementada (solo login simulado en js/core.js › enter()) | No implementada |
| HU-02 | Gestión del usuario | Casos de uso: Gestionar perfil; Clases: Usuario.editarPerfil() | — | No implementada | No implementada |
| HU-03 | Visualización de cámaras | Casos de uso: Ver cámaras; Clases: Camara; Componentes: Video vigilancia; C4-3: Módulo de Cámaras y Zonas | IT-01, IT-02 (acceso al módulo por rol); prueba visual manual M-02 | js/camaras.js (video simulado) | Parcial |
| HU-04 | Chat de la comunidad | Casos de uso: Enviar/recibir mensajes; Clases: MensajeChat; Componentes: Chat comunitario | UT-01, IT-04 | js/chat.js; js/logica.js › esc() | Implementada |
| HU-05 | Notificaciones | Secuencia (alt/loop); Clases: Notificacion; C4-2: Servicio de Notificaciones; ADR-004 | UT-15, UT-16, UT-17, UT-18, IT-06 | js/logica.js › enviarConReintentos(); js/emergencias.js; js/core.js › notify() | Parcial (SMS simulado) |
| HU-06 | Base de datos | Clases (todas); Despliegue: Servidor de BD; C4-2: Base de Datos; ADR-003 | — | No implementada (datos en memoria: objeto S en js/core.js) | No implementada |
| HU-07 | Gestor de seguridad | Casos de uso: Gestionar notificaciones; Clases: ResponsableSeguridad; Componentes: Gestión de seguridad | IT-07, IT-10 | js/emergencias.js › renderAl(); js/incidentes.js › renderInc() | Parcial |
| HU-08 | Reporte de incidente | Casos de uso: Reportar incidente (extend: Adjuntar evidencias); Clases: Incidente | UT-09, UT-10, UT-11, IT-09, IT-10 | js/incidentes.js; js/logica.js › crearIncidente(), clasificar() | Implementada |
| HU-09 | Emergencias | Casos de uso: Activar botón de pánico (include: Notificar emergencia); Secuencia; Clases: Emergencia, Alerta | UT-08, IT-05 | js/emergencias.js; js/logica.js › crearAlerta() | Implementada |
| HU-10 | Ubicación y mapa de estado | Componentes: Mapa y ubicación; Clases: ZonaInteres; C4-2: Servicio de Mapas | Prueba visual manual M-02 | js/mapa.js (mapa SVG simulado) | Parcial |
| HU-11 | Historial de actividades | Clases: Actividad; Componentes: Historial de actividades | UT-03, IT-03 | js/core.js › log(), renderLog() | Implementada |
| HU-12 | Reportes y estadísticas | Clases: ReporteEstadistico; C4-3: Módulo de Reportes y Auditoría | — | js/mapa.js › stats() (solo contadores) | Parcial |
| HU-13 | Control de permisos | Casos de uso: Definir roles y permisos; Clases: Usuario–Rol–Permiso | UT-02, UT-03, UT-04, IT-01, IT-02, IT-08, IT-10 | js/logica.js › modulosPorRol(), puedeClasificar(); js/core.js › enter() | Parcial (solo en el cliente) |
| HU-14 | Gestión de alarmas | Secuencia (opt: atender); Clases: Alerta, EstadoAlerta | UT-05, UT-06, IT-07, IT-08 | js/emergencias.js › renderAl(); js/logica.js › siguienteEstado() | Implementada |
| HU-15 | Gestión de evidencias | Casos de uso: Adjuntar evidencias (extend); Clases: Evidencia; C4-2: Almacenamiento de Evidencias; ADR-005 | UT-12, UT-13, UT-14 | js/incidentes.js; js/logica.js › validarEvidencia(), sha256Hex(), verificarIntegridad() | Parcial (sin almacenamiento real) |

**Resumen.** 5 historias implementadas, 7 parciales y 3 no implementadas en el prototipo. 11 de las 15 historias tienen al menos una prueba que las verifica; las historias sin prueba (HU-01, HU-02, HU-06 y HU-12) son las que aún no existen o solo están simuladas.
