export const deleteUser = async (id) => {
    await fetch(`http://localhost:3001/usuarios/${id}`, {
        method: 'DELETE'
    });
}