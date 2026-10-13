# 5. Prototipo funcionando

**Repositorio:** https://github.com/Alejo0092/seguridad-barrios-ing_software

**Demostración en línea (versión anterior):** https://claude.ai/artifact/HjDz33Xket3N1iQKzggFse

**Pipeline de CI:** https://github.com/Alejo0092/seguridad-barrios-ing_software/actions (estado en la sección 4.5).

## 5.1 Qué se amplió respecto al taller de la semana 12

[COMPLETAR: una línea con lo que contenía la entrega de la semana 12, para que la comparación sea exacta.]

La solución actual agrega:
- **Inicio de sesión por roles** (Residente, Responsable de Seguridad, Administrador) con módulos distintos para cada uno (HU-13).
- **Seis módulos navegables:** mapa con capas, cámaras, chat comunitario, emergencias y alertas, incidentes con evidencia e historial.
- **Flujo de emergencia** alineado con el diagrama de secuencia: alerta, medición de tiempo frente a la meta de 5 s, reintentos (hasta 3) y cierre por el responsable.
- **Gestión de evidencias:** validación de formato y tamaño, hash SHA-256 y verificación de integridad (HU-15).
- **Lógica de negocio separada** en `js/logica.js` y **28 pruebas automáticas** con un pipeline de CI.
- **Cuatro defectos corregidos** gracias a las pruebas (ver sección 4.4).

## 5.2 Instrucciones (resumen del README)

1. Clonar el repositorio y abrir la carpeta en VS Code.
2. Instalar la extensión **Live Server** y abrir `index.html` con *Open with Live Server* (también funciona con doble clic).
3. Entrar con cualquier correo y contraseña, eligiendo el rol.
4. Para probar: `npm ci` y `npm test` (requiere Node.js 22 o superior).

## 5.3 Alcance y límites

Es un prototipo: no hay backend, los datos se guardan en memoria y las cámaras, los SMS y el almacenamiento de evidencias están simulados (deudas D-01, D-02 y D-03). Sirve para validar los flujos con usuarios y para respaldar las decisiones de arquitectura.
