export const armarCiudades = (elemento, datos) => {
  const fragmento = document.createDocumentFragment();
  const option = document.createElement('option');
  option.textContent = "Seleccione...";
  fragmento.append(option);
  datos.forEach(ciudad => {
    const opcion = document.createElement('option');
    // Creamos los atributos
    opcion.setAttribute("value", ciudad.id);
    opcion.textContent = ciudad.ciudad;
    fragmento.append(opcion)
  });

  elemento.append(fragmento);
}