// Lógica de negocio de HU-01: registro de residentes.
const crypto = require('crypto');

class ErrorNegocio extends Error {
  constructor(mensaje, estado) {
    super(mensaje);
    this.estado = estado;
  }
}

const CORREO_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function registrarUsuario(repo, { nombre, correo, password }) {
  if (!nombre || !nombre.trim()) {
    throw new ErrorNegocio('El nombre es obligatorio', 400);
  }
  if (!correo || !CORREO_REGEX.test(correo)) {
    throw new ErrorNegocio('El correo no es válido', 400);
  }
  if (!password || password.length < 8) {
    throw new ErrorNegocio('La contraseña debe tener al menos 8 caracteres', 400);
  }

  const correoNormalizado = correo.trim().toLowerCase();
  if (repo.buscarPorCorreo(correoNormalizado)) {
    throw new ErrorNegocio('Ya existe una cuenta con ese correo', 409);
  }

  const usuario = repo.guardar({
    nombre: nombre.trim(),
    correo: correoNormalizado,
    passwordHash: hashPassword(password),
    rol: 'residente',
  });

  // Nunca devolvemos la contraseña ni su hash
  return { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol };
}

module.exports = { registrarUsuario, ErrorNegocio };
