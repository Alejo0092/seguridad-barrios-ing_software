const request = require('supertest');
const { crearApp } = require('../src/app');
const { crearUsuariosRepo } = require('../src/repositories/usuariosRepo');

const datosValidos = {
  nombre: 'Laura Gómez',
  correo: 'laura@correo.com',
  password: 'clave12345',
};

describe('HU-01 Registro de usuario', () => {
  // Prueba 1: criterio de aceptación (Dado / Cuando / Entonces)
  test('Dado un residente no registrado, cuando envía datos válidos, entonces se crea la cuenta sin exponer la contraseña', async () => {
    const app = crearApp();
    const res = await request(app).post('/api/usuarios/registro').send(datosValidos);

    expect(res.status).toBe(201);
    expect(res.body.correo).toBe('laura@correo.com');
    expect(res.body.rol).toBe('residente');
    expect(res.body.password).toBeUndefined();
    expect(res.body.passwordHash).toBeUndefined();
  });

  // Prueba 2: regla de negocio - correo único
  test('rechaza con 409 un correo que ya está registrado', async () => {
    const app = crearApp();
    await request(app).post('/api/usuarios/registro').send(datosValidos);
    const res = await request(app).post('/api/usuarios/registro').send(datosValidos);

    expect(res.status).toBe(409);
  });

  // Prueba 3: validación de contraseña
  test('rechaza con 400 una contraseña menor a 8 caracteres', async () => {
    const app = crearApp();
    const res = await request(app)
      .post('/api/usuarios/registro')
      .send({ ...datosValidos, password: '123' });

    expect(res.status).toBe(400);
  });

  // Prueba 4: validación de correo
  test('rechaza con 400 un correo con formato inválido', async () => {
    const app = crearApp();
    const res = await request(app)
      .post('/api/usuarios/registro')
      .send({ ...datosValidos, correo: 'no-es-un-correo' });

    expect(res.status).toBe(400);
  });

  // Prueba 5: los datos realmente se guardan (con contraseña cifrada)
  test('guarda el usuario con la contraseña cifrada, no en texto plano', async () => {
    const repo = crearUsuariosRepo();
    const app = crearApp(repo);
    await request(app).post('/api/usuarios/registro').send(datosValidos);

    const guardado = repo.buscarPorCorreo('laura@correo.com');
    expect(guardado).not.toBeNull();
    expect(guardado.passwordHash).not.toContain('clave12345');
  });
});
