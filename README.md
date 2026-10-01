# Sistema de Seguridad en Barrios

![CI](https://github.com/USUARIO/REPOSITORIO/actions/workflows/ci.yml/badge.svg)

Proyecto de Ingeniería de Software (UPB, 2026-2).
Integrantes: Carlos Felipe Feria Chaparro, Alejandro Yepes Bedoya.

## Historia implementada
**HU-01 Registro de usuario:** un residente crea su cuenta con nombre, correo y contraseña.

- Interfaz: `http://localhost:3000`
- Endpoint: `POST /api/usuarios/registro`

## Requisitos
- Node.js 20 o superior
- Git

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

## Pipeline de CI
Archivo `.github/workflows/ci.yml`. En cada push y pull request instala dependencias (`npm ci`) y corre las pruebas (`npm test`). El estado se ve en la pestaña **Actions** y en la insignia de arriba.

## Uso de IA
Se usó Claude para orientar el paso a paso del taller y generar el código base de la HU-01. El equipo revisó el código, lo probó, entendió cada parte y lo adaptó al proyecto. (Ajusten este texto con lo que realmente hicieron.)
