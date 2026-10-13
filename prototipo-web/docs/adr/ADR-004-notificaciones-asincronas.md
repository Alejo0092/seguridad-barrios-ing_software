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
