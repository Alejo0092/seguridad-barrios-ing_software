// Capa de datos. Por ahora guarda en memoria (simple y sin configurar nada).
// Más adelante se puede reemplazar por PostgreSQL sin tocar la lógica.
function crearUsuariosRepo() {
  const usuarios = [];
  let siguienteId = 1;

  return {
    buscarPorCorreo(correo) {
      return usuarios.find((u) => u.correo === correo) || null;
    },
    guardar(datos) {
      const usuario = { id: siguienteId++, ...datos };
      usuarios.push(usuario);
      return usuario;
    },
    listar() {
      return [...usuarios];
    },
  };
}

module.exports = { crearUsuariosRepo };
