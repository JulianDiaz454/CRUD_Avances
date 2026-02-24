export const updateUser = async (id, datos) => {
    const peticion = await fetch(`http://localhost:3001/usuarios/${id}`, {
        method: 'PUT',
        body: JSON.stringify(datos),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    });
    return await peticion.json();
}   