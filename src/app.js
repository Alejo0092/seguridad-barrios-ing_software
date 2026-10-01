const express = require('express');
const path = require('path');
const { crearUsuariosRepo } = require('./repositories/usuariosRepo');
const { registrarUsuario, ErrorNegocio } = require('./services/registroService');

function crearApp(repo = crearUsuariosRepo()) {
  const app = express();
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // HU-01: registro de residente
  app.post('/api/usuarios/registro', (req, res) => {
    try {
      const usuario = registrarUsuario(repo, req.body || {});
      res.status(201).json(usuario);
    } catch (err) {
      if (err instanceof ErrorNegocio) {
        return res.status(err.estado).json({ error: err.message });
      }
      console.error(err);
      res.status(500).json({ error: 'Error interno' });
    }
  });

  return app;
}

module.exports = { crearApp };
