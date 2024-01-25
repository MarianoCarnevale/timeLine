"use strict";

const url = "./zelda.json";
let datos;
let datosInvertidos = false;

// Función principal que se ejecuta al cargar la página
function getZelda() {
  // Obtener referencias a los botones en el DOM
  const reverseButton = document.getElementById("reversebtn");
  const resetButton = document.getElementById("resetbtn");

  // Agregar event listeners a los botones
  reverseButton.addEventListener("click", toggleOrden);
  resetButton.addEventListener("click", resetTimeline);

  // Intentar obtener datos desde el almacenamiento local
  const localStorageData = localStorage.getItem("zeldaDatos");

  // Verificar si hay datos almacenados localmente
  if (localStorageData) {
    // Si hay datos, cargarlos y actualizar la línea de tiempo
    datos = JSON.parse(localStorageData);
    ordenarDatos(); // Ordenar los datos al cargar
    updateTimeline();
  } else {
    // Si no hay datos almacenados, realizar una solicitud fetch para obtenerlos
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Ordenar los datos después de obtenerlos
        datos = data;
        ordenarDatos();

        // Almacenar los datos ordenados en el almacenamiento local
        localStorage.setItem("zeldaDatos", JSON.stringify(datos));

        // Actualizar la línea de tiempo
        updateTimeline();
      })
      .catch((err) => console.error(err.message));
  }
}

// Función para ordenar los datos según la fecha
function ordenarDatos() {
  datos.sort((a, b) => (datosInvertidos ? b.date - a.date : a.date - b.date));
}

// Función para cambiar el orden de los datos
function toggleOrden() {
  datosInvertidos = !datosInvertidos;
  ordenarDatos();
  updateTimeline();
}

// Función para restablecer la línea de tiempo a su estado original
function resetTimeline() {
  // Realizar una solicitud fetch para obtener los datos originales
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Almacenar los datos originales en el almacenamiento local
      localStorage.setItem("zeldaDatos", JSON.stringify(data));
      // Asignar los datos originales y actualizar la línea de tiempo
      datos = data;

      // Ordenar los datos después de cargarlos
      ordenarDatos();

      updateTimeline();
    })
    .catch((err) => console.error(err.message));
}

// Función para eliminar un evento de la línea de tiempo
function eliminarEvento(index) {
  datos.splice(index, 1);
  updateTimeline();
  localStorage.setItem("zeldaDatos", JSON.stringify(datos));
}

// Función para actualizar la línea de tiempo en el DOM
function updateTimeline() {
  const timelineElement = document.getElementById("timeline");
  timelineElement.innerHTML = "";

  // Iterar sobre cada evento y agregarlo a la línea de tiempo
  datos.forEach((evento, index) => {
    const container = document.createElement("li");
    container.className = "card-container";

    const timelineCircle = document.createElement("div");
    timelineCircle.className = "timeline-circle";

    const card = document.createElement("article");
    card.className = "card";

    if (evento.image) {
      // Si hay una imagen en el evento, crear un elemento de imagen y agregarlo a la tarjeta
      const img = document.createElement("img");
      img.src = evento.image;
      card.appendChild(img);
    }

    // Crear elementos para el título, fecha y texto del evento
    const title = document.createElement("h3");
    title.textContent = evento.title;
    const date = document.createElement("p");
    date.textContent = `Fecha: ${evento.date}`;
    const text = document.createElement("p");
    text.textContent = evento.text;

    // Agregar elementos a la tarjeta
    card.appendChild(title);
    card.appendChild(date);
    card.appendChild(text);

    // Crear un botón de eliminación y agregar un event listener
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", () => eliminarEvento(index));

    card.appendChild(deleteButton);

    // Agregar elementos a los contenedores y la línea de tiempo
    container.appendChild(timelineCircle);
    container.appendChild(card);
    timelineElement.appendChild(container);
  });
}

// Llamar a la función principal para inicializar la aplicación
getZelda();

//Scroll flecha top pagina
document.addEventListener("DOMContentLoaded", function () {
  let flecha = document.getElementById("flechascroll");
  window.onscroll = function () {
    let distanciadesplazada = 2400;
    let posicionFooter = document.getElementById("contact").offsetTop
    
    flecha.style.display = (window.scrollY > distanciadesplazada && window.scrollY < (posicionFooter - window.innerHeight)) ? "block" : "none";
  };
});

function agregarClaseVisible() {
  var elementosAnimar = document.querySelectorAll('.card-container');

  elementosAnimar.forEach(function(elemento) {
    var posicionElemento = elemento.getBoundingClientRect().top;
    var alturaPantalla = window.innerHeight || document.documentElement.clientHeight;

    if (posicionElemento < alturaPantalla) {
      elemento.classList.add('visible');
    }
  });
}

// Evento de scroll para activar la función cuando se haga scroll
window.addEventListener('scroll', agregarClaseVisible);
