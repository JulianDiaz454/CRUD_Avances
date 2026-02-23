export const armarGenero = (elemento, datos) => {
  const fragmento = document.createDocumentFragment();
  datos.forEach(genero => {
    // Creamos los selectores
    const div = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');
    // Asignamos los atributos
    label.setAttribute("for", genero.genero);
    label.textContent = genero.genero;
    input.setAttribute("type", "radio");
    input.setAttribute("id", genero.genero);
    input.setAttribute("name", "genero");
    input.value = genero.id;
    // Agregamos los atributos
    div.append(label, input);
    fragmento.append(div);
  });
  elemento.append(fragmento)
}