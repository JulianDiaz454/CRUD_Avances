export const validar = (form, reglas) => {
  const errores = {}
  let valido = true;
  for (const name in reglas) {
    // Obtenemos el elemento del formulario por el nombre
    const campo = form.elements[name];
    // Obtenemos la regla de validacion por el campo
    const regla = reglas[name];
    // validamos si es una lista de elementos
    if (campo instanceof NodeList) {
      if (regla.required) {
        let { esValido, mensaje } = validarNodos(campo, regla)
        valido = esValido;
        if (!valido)
          errores[name] = mensaje;
      }
    } else if (campo.type == "text") {
      let { esValido, mensaje } = validarCamposTipoText(campo, regla);
      valido = esValido;
      if (!valido)
        errores[name] = mensaje;
    } else if (campo.type == "select-one") {
      let { esValido, mensaje } = validarCamposTipoSelect(campo, regla);
      valido = esValido;
      if (!valido)
        errores[name] = mensaje;
    }
  }
  // Validamos si objeto errores no tiene error registrado
  if (Object.keys(errores).length != 0) {
    valido = false
  }
  // Retornamos el objeto con la validación del formulario y los errores si los tiene
  return { valido, errores };
}

/**
 * 
 * @param {NodeList} nodo - Nodos de elementos 
 * @param {Object} regla Reglas de validación por nombre de campo
 * @returns  {Object} - {esValido: boolean, mensaje: string}
 */
const validarNodos = (nodo, regla) => {
  let esValido = false;
  for (const key of nodo) {
    if (key.checked) {
      return {
        esValido: true,
      }
    }
  }
  return {
    esValido,
    mensaje: regla.mensaje,
  }
}

/**
 * Función para validar los campos de tipo texto.
 * 
 * @param {HTMLElement} radio - Elemento de tipo radio 
 * @param {Object} regla - Reglas de validación por nombre de campo
 * @returns {Object} - {esValido: boolean, mensaje: string}
 */
const validarCamposTipoText = (elemento, regla) => {
  if (regla.required && elemento.value == "") {
    return {
      esValido: false,
      mensaje: regla.mensaje,
    }
  }
  if (regla.required && regla.min > elemento.value.length) {
    return {
      esValido: false,
      mensaje: `El campo debe tener como minimo ${regla.min}  de campos`,
    }
  }
  if (regla.required && regla.max < elemento.value.length) {
    return {
      esValido: false,
      mensaje: `El campo debe tener como maximo ${regla.max} de campos`,
    }
  }
  return {
    esValido: true
  }
}

/**
 * Función para validar los campos de tipo select
 * 
 * @param {HTMLSelectElement} elemento - Elemento de tipo selección 
 * @param {*} regla - Reglas de validación por nombre de campo
 * @returns {Object} - {esValido: boolen, mensaje: string}
 */
const validarCamposTipoSelect = (elemento, regla) => {
  if (regla.required && elemento.selectedIndex == 0) {
    return {
      esValido: false,
      mensaje: regla.mensaje,
    }
  }
  return {
    esValido: true
  }
}