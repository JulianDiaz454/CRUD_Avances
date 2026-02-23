export const createUser = async (documento, nombre, genero_id, ciudad_id, correo) => {
  const newUser = {
    documento,
    nombre,
    genero_id,
    ciudad_id,
    correo
  }

  const peticion = await fetch('http://localhost:3001/usuarios', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  });

  return await peticion.json();
}