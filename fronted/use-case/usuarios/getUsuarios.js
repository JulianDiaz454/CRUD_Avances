export const usuarios = async () => {
    const peticion = await fetch('http://localhost:3001/usuarios');
    const datos = await peticion.json();
    return datos;
}