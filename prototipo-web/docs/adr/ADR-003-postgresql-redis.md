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
