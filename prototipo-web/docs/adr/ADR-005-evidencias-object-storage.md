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
