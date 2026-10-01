# Sistema de Seguridad en Barrios

![CI](https://github.com/Alejo0092/seguridad-barrios-ing_software)
Proyecto de Ingeniería de Software, Universidad Pontificia Bolivariana (UPB), semestre 2026-2.

## Integrantes

| Nombre | ID |
|---|---|
| Carlos Felipe Feria Chaparro | 000196706 |
| Alejandro Yepes Bedoya | 000254518 |

## Descripción y justificación

El Sistema de Seguridad en Barrios busca que los residentes de un barrio cuenten con una herramienta digital propia para participar en la seguridad de su comunidad. El primer paso para cualquier funcionalidad de este tipo es saber quién usa el sistema: sin cuentas de usuario no es posible atribuir reportes, controlar accesos ni construir confianza entre vecinos. Por eso la primera historia que se implementó es el registro de usuarios.

Este repositorio también cumple un objetivo formativo: aplicar prácticas de ingeniería de software como el trabajo por historias de usuario, el control de versiones con Git, las pruebas automatizadas y la integración continua (CI), de modo que cada cambio al código quede verificado de forma reproducible.

## Historia implementada

**HU-01 Registro de usuario:** un residente crea su cuenta con nombre, correo y contraseña.

- Interfaz: `http://localhost:3000`
- Endpoint: `POST /api/usuarios/registro`

## Requisitos

- **Node.js 20 o superior:** versión LTS con soporte activo, que garantiza que todos los integrantes y el pipeline de CI ejecuten el proyecto en el mismo entorno.
- **Git:** necesario para clonar el repositorio y trabajar con ramas y pull requests.

## Cómo levantar el proyecto desde cero

```bash
git clone https://github.com/USUARIO/REPOSITORIO.git
cd REPOSITORIO
npm install
npm start
```

Abrir http://localhost:3000 en el navegador.

## Cómo correr las pruebas

```bash
npm test
```

Las pruebas automatizadas permiten comprobar que la HU-01 se comporta como se espera y detectar de inmediato si un cambio posterior rompe algo que ya funcionaba.

## Pipeline de CI

Archivo: `.github/workflows/ci.yml`.

En cada push y pull request el pipeline instala las dependencias (`npm ci`) y corre las pruebas (`npm test`). Se usa `npm ci` en lugar de `npm install` porque instala exactamente las versiones fijadas en `package-lock.json`, lo que hace la instalación reproducible y evita fallos que solo ocurren en una máquina. El estado se puede ver en la pestaña **Actions** del repositorio y en la insignia al inicio de este documento.

La razón de tener CI es sencilla: ningún cambio debería llegar a la rama principal sin haber pasado las pruebas, y esa verificación no debe depender de que alguien se acuerde de correrlas a mano.

## Uso de IA

Para este proyecto se usó **Claude** (Anthropic) como herramienta de apoyo. Declaramos de forma transparente en qué se usó y cómo se controló su aporte.

**En qué se usó**
- Orientar el paso a paso del taller: qué configurar primero, en qué orden y por qué.
- Generar el código base de la HU-01 (registro de usuario).
- Apoyar la redacción y organización de esta documentación.

**Cómo se controló su aporte**
- El equipo revisó el código generado línea por línea antes de incorporarlo.
- Se probó manualmente desde la interfaz y con `npm test`, sin asumir que el código funcionaba por haber sido generado.
- Cada integrante puede explicar qué hace cada parte del código y por qué está ahí.
- El código se adaptó a las necesidades del proyecto en lugar de copiarse sin cambios.

**Responsabilidad y límites**
- La IA se trató como un asistente, no como autora del proyecto: las decisiones de diseño, la verificación y el resultado final son responsabilidad del equipo.
- Somos conscientes de que una herramienta de IA puede producir código incorrecto o incompleto con apariencia de seguridad, por eso la validación humana y las pruebas automatizadas son parte del proceso y no un paso opcional.
- El uso de IA se declara aquí para que el trabajo sea transparente y evaluable.