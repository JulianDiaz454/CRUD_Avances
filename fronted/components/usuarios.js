export const armarListaUsuarios = (elemento, datos) => {
  elemento.innerHTML = "";
  const fragmento = document.createDocumentFragment();

  datos.forEach(usuario => {
    const contenedorUsuario = document.createElement('div');
    const pNombre = document.createElement('p');
    const pDocumento = document.createElement('p');
    const pGenero = document.createElement('p');
    const pCiudad = document.createElement('p');
    const pCorreo = document.createElement('p');
    const iconoBorrar = document.createElement('i');
    const btnEditar = document.createElement('button');

    // Atributos y Contenido
    contenedorUsuario.classList.add('usuario-tarjeta');
    contenedorUsuario.dataset.id = usuario.id; // Guardamos el ID aquí

    iconoBorrar.classList.add('bi', 'bi-trash-fill', 'btn-eliminar');
    
    btnEditar.textContent = "Editar Usuario";
    btnEditar.classList.add('btn-editar');

    pNombre.textContent = `Nombre: ${usuario.nombre}`;
    pDocumento.textContent = `Documento: ${usuario.documento}`;
    pGenero.textContent = `Genero: ${usuario.genero_id}`;
    pCiudad.textContent = `Ciudad: ${usuario.ciudad_id}`;
    pCorreo.textContent = `Correo: ${usuario.correo}`;

    // Agregamos todo (el icono va primero para que flote arriba)
    contenedorUsuario.append(iconoBorrar, pNombre, pDocumento, pGenero, pCiudad, pCorreo, btnEditar);
    fragmento.append(contenedorUsuario);
  });

  elemento.append(fragmento);
}