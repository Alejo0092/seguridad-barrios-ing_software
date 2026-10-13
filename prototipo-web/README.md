# Vecindario Seguro — Sistema de Seguridad en Barrios

[![CI](https://github.com/Alejo0092/seguridad-barrios-ing_software/actions/workflows/ci.yml/badge.svg)](https://github.com/Alejo0092/seguridad-barrios-ing_software/actions/workflows/ci.yml)

Prototipo web del proyecto de Ingeniería de Software (Universidad Pontificia Bolivariana).
Integrantes: Carlos Felipe Feria Chaparro y Alejandro Yepes Bedoya.

Es una demostración hecha con HTML, CSS y JavaScript puro. No tiene backend: los datos viven en memoria y se pierden al recargar (ver deuda técnica D-02 en la documentación).

## Qué incluye
- Inicio de sesión con ilustración interactiva y **tres roles** (Residente, Responsable de Seguridad, Administrador) que cambian los módulos visibles (HU-13).
- **Mapa** con capas (HU-10), **cámaras** simuladas (HU-03), **chat** comunitario (HU-04).
- **Botón de emergencia** con alerta, reintentos de envío y cierre de la alerta por el responsable (HU-09, HU-05, HU-14).
- **Reporte de incidentes con evidencia**: valida el archivo, calcula su hash SHA-256 y comprueba su integridad (HU-08, HU-15).
- **Historial** de actividades (HU-11).

## Cómo ejecutarlo
Necesitas solo un navegador.
1. Clona el repositorio: `git clone https://github.com/Alejo0092/seguridad-barrios-ing_software.git`
2. Abre la carpeta en VS Code, instala la extensión **Live Server** y haz clic derecho en `index.html` → *Open with Live Server*. (También sirve abrir `index.html` con doble clic.)
3. Entra con cualquier correo y contraseña; elige el rol que quieras probar.

## Cómo ejecutar las pruebas
Necesitas [Node.js](https://nodejs.org) 22 o superior.
```bash
npm ci          # instala jsdom (única dependencia, solo para pruebas)
npm test        # 18 pruebas unitarias + 10 de integración
npm run lint    # revisa la sintaxis de js/*.js
```
El pipeline de GitHub Actions (`.github/workflows/ci.yml`) ejecuta lo mismo en cada *push* y *pull request*.

## Estructura
```
index.html              pantallas de login y panel
css/styles.css          estilos
js/logica.js            reglas de negocio puras (se prueban con Node)
js/core.js              estado, login, navegación, notificaciones, historial
js/mapa.js              mapa y capas
js/camaras.js           cámaras
js/chat.js              chat comunitario
js/emergencias.js       botón de emergencia y alertas
js/incidentes.js        incidentes y evidencias
js/escena-login.js      ilustración interactiva
test/unit               pruebas unitarias (UT-01 a UT-18)
test/integration        pruebas de integración con jsdom (IT-01 a IT-10)
docs/ y diagramas/    documentación de la entrega (ADR, riesgos, trazabilidad, diagramas)
```
