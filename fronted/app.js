// Importaciones
import { armarCiudades, armarGenero, armarListaUsuarios } from "./components/index.js";
import { validar } from "./helpers/validarFormulario.js";
import { ciudades, generos, usuarios, createUser, deleteUser, updateUser } from "./use-case/index.js";

// variables
const formulario = document.querySelector('form');
const documento = document.querySelector("#documento");
const nombre = document.querySelector("#nombre");
const correo = document.querySelector("#correo");
const divGeneros = document.getElementById("generos");
const ciudad = document.querySelector("#ciudadId");
const divDinamico = document.querySelector('#usuarios-dinamicos');

const reglas =
{
  documento: { required: true, min: 8, max: 10, mensaje: "El campo es obligatorio" },
  nombre: { required: true, mensaje: "El campo es obligatorio" },
  genero: { required: true, mensaje: "Por favor seleccione su genero" },
  ciudad: { required: true, mensaje: "Por favor seleccione su ciudad" },
  correo: { required: true, mensaje: "El campo es obligatorio" }
};

// Métodos

/**
 * Función para validar los campos del formulario formulario
 * 
 * @param {HTMLFormElement} form - Formulario a validar
 * @returns  {Object} - {esValido: boolean, documento: string, nombre: string, genero: string, ciuda: string, correo: string }
 */
const validarFormulario = (e) => {
  let respuesta = validar(e, reglas);
  documento.classList.remove('error')
  nombre.classList.remove('error')
  ciudad.classList.remove('error');
  divGeneros.classList.remove('error')
  correo.classList.remove('error')
  if (!respuesta.valido) {
    if (respuesta.errores.documento) {
      documento.classList.add('error')
    }
    if (respuesta.errores.nombre) {
      nombre.classList.add('error')
    }
    if (respuesta.errores.ciudad) {
      ciudad.classList.add('error')
    }
    if (respuesta.errores.genero) {
      divGeneros.classList.add('error')
    }
    if (respuesta.errores.correo) {
      correo.classList.add('error')
    }
  }
  if (!respuesta.valido) {
    return {
      esValido: respuesta.valido
    }
  } else {
    return {
      esValido: respuesta.valido,
      documento: documento.value,
      nombre: nombre.value,
      genero_id: e.querySelector('input[name="genero"]:checked').value,
      ciudad_id: ciudad.value,
      correo: correo.value
    }
  }
}


// Eventos
document.addEventListener("DOMContentLoaded", async () => {
  let datosCiudades = await ciudades();
  let datosGeneros = await generos();
  let datosUsuarios = await usuarios(); 
  armarGenero(divGeneros, datosGeneros);
  armarCiudades(ciudad, datosCiudades);
  armarListaUsuarios(divDinamico, datosUsuarios);
})

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const datosValidados = validarFormulario(e.target);
  if (!datosValidados.esValido) return;

  // Preparamos el objeto con los datos
  const objetoUsuario = {
    documento: datosValidados.documento,
    nombre: datosValidados.nombre,
    genero_id: datosValidados.genero_id,
    ciudad_id: datosValidados.ciudad_id,
    correo: datosValidados.correo
  };

  // Verificamos si estamos en modo actualización
  if (formulario.dataset.mode === "update") {
      const id = formulario.dataset.editId;
      await updateUser(id, objetoUsuario);
      
      // Limpiamos el estado de edición
      delete formulario.dataset.mode;
      delete formulario.dataset.editId;
      formulario.querySelector('.btn').textContent = "Enviar";
  } else {
      // Modo creación normal
      await createUser(
        objetoUsuario.documento, 
        objetoUsuario.nombre, 
        objetoUsuario.genero_id, 
        objetoUsuario.ciudad_id, 
        objetoUsuario.correo
      );
  }

  // Refrescamos la lista
  const listaActualizada = await usuarios();
  armarListaUsuarios(divDinamico, listaActualizada);

  // Limpiamos el formulario
  e.target.reset();
});

// Evento para Eliminar
divDinamico.addEventListener('click', async (e) => {
    // Validamos que el clic sea específicamente en el icono de basura
    if (e.target.classList.contains('bi-trash-fill')) {
        // Obtenemos el ID desde el dataset del contenedor padre (la card)
        const tarjeta = e.target.closest('.usuario-tarjeta');
        const id = tarjeta.dataset.id;
        const confirmar = confirm("¿Quieres eliminar este usuario?");
        
        if (confirmar) {
            // Llamamos a tu petición DELETE con query params
            await deleteUser(id); 
            
            // Refrescamos la lista inmediatamente
            const listaActualizada = await usuarios();
            armarListaUsuarios(divDinamico, listaActualizada);
        }
    }
});

// Evento para modificar el usuario
divDinamico.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-editar')) {
        const tarjeta = e.target.closest('.usuario-tarjeta');
        const id = tarjeta.dataset.id;
ll
        // Buscamos los datos actuales de los usuarios
        const lista = await usuarios();
        const user = lista.find(u => u.id == id);

        if (user) {
            // Llenamos los inputs simples
            documento.value = user.documento;
            nombre.value = user.nombre;
            correo.value = user.correo;
            ciudad.value = user.ciudad_id;

            // Para el radio de género
            const radioGenero = formulario.querySelector(`input[name="genero"][value="${user.genero_id}"]`);
            if (radioGenero) radioGenero.checked = true;

            // Guardamos el ID y el estado en el formulario usando dataset
            formulario.dataset.mode = "update";
            formulario.dataset.editId = id;
            
            // Cambiamos el texto del botón para que el usuario sepa que está editando
            formulario.querySelector('.btn').textContent = "Actualizar Usuario";
        }
    }
});