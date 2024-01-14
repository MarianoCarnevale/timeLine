"use strict";

const url = "./zelda.json";
let datos

function getZelda() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Ordenar eventos por año
      data.sort((a, b) => a.date - b.date);
      // Almacenar los datos globalmente
      datos = data;
      // Crear tarjetas para cada evento
      const timelineElement = document.getElementById("timeline");
      data.forEach((evento) => {
        // Contenedor principal de la tarjeta y círculo
        const container = document.createElement("li");
        container.className = "card-container";

        // Círculo de la línea de tiempo
        const timelineCircle = document.createElement("div");
        timelineCircle.className = "timeline-circle";

        // Tarjeta
        const card = document.createElement("article");
        card.className = "card";

        // Añadir imagen si está presente en el JSON
        if (evento.image) {
          const img = document.createElement("img");
          img.src = evento.image;
          card.appendChild(img);
        }

        // Añadir título, fecha y texto
        const title = document.createElement("h3");
        title.textContent = evento.title;
        const date = document.createElement("p");
        date.textContent = `Fecha: ${evento.date}`;
        const text = document.createElement("p");
        text.textContent = evento.text;

        card.appendChild(title);
        card.appendChild(date);
        card.appendChild(text);

        // Agregar círculo y tarjeta al contenedor
        container.appendChild(timelineCircle);
        container.appendChild(card);

        // Agregar el contenedor al timeline
        timelineElement.appendChild(container);
      });
      updateTimeline(datos);
      // Agregar el console.log aquí
      console.log('Datos cargados en la línea de tiempo:', data);
    })
    
    .catch((err) => console.error(err.message));
}


getZelda();

document.addEventListener("scroll", function () {
  let header = document.querySelector("header");
  let line = document.querySelector(".line");
  let timelineCircles = document.querySelectorAll(".timeline-circle");
  let mainSection = document.querySelector("main");
  let scrollPosition = window.scrollY;

  // Calcula la posición en la que mainSection comienza
  let mainTop = mainSection.getBoundingClientRect().top;

  // Si el scroll ha pasado el inicio de mainSection, muestra .line
  if (mainTop < window.innerHeight) {
    line.style.opacity = 1;

    // Muestra gradualmente cada .timeline-circle
    timelineCircles.forEach(function (circle, index) {
      let circleTop = circle.getBoundingClientRect().top;
      if (circleTop < window.innerHeight) {
        setTimeout(function () {
          circle.style.opacity = 1;
        }, index * 200); // Retraso para un efecto de aparición escalonada
      }
    });
  } else {
    // Oculta .line y todos los .timeline-circle si el scroll retrocede
    line.style.opacity = 0;
    timelineCircles.forEach(function (circle) {
      circle.style.opacity = 0;
    });
  }
});
///* BOTON REVERSE*/

// Función para invertir el orden de los datos
function invertirOrden(datos) {
  console.log('Iniciando inversión de datos...');
  // Realiza alguna lógica para invertir el orden de los datos (por ejemplo, si datos es un array, podrías usar reverse())
  datos.sort((a, b) => b.date - a.date);
  console.log('Datos invertidos:', datos);
  // Llamar a la función para actualizar el DOM con los datos invertidos
  updateTimeline(datos);
}

// Función para actualizar la línea de tiempo en el DOM
function updateTimeline(data) {

  // Limpiar el contenido actual de la línea de tiempo
  const timelineElement = document.getElementById("timeline");
  timelineElement.innerHTML = "";

  // Crear tarjetas para cada evento (similar al código existente)
  data.forEach((evento) => {
    // Contenedor principal de la tarjeta y círculo
    const container = document.createElement("li");
    container.className = "card-container";

    // Círculo de la línea de tiempo
    const timelineCircle = document.createElement("div");
    timelineCircle.className = "timeline-circle";

    // Tarjeta
    const card = document.createElement("article");
    card.className = "card";

    // Añadir imagen si está presente en el JSON
    if (evento.image) {
      const img = document.createElement("img");
      img.src = evento.image;
      card.appendChild(img);
    }

    // Añadir título, fecha y texto
    const title = document.createElement("h3");
    title.textContent = evento.title;
    const date = document.createElement("p");
    date.textContent = `Fecha: ${evento.date}`;
    const text = document.createElement("p");
    text.textContent = evento.text;

    card.appendChild(title);
    card.appendChild(date);
    card.appendChild(text);

    // Agregar círculo y tarjeta al contenedor
    container.appendChild(timelineCircle);
    container.appendChild(card);

    // Agregar el contenedor al timeline
    timelineElement.appendChild(container);
  });
}

// Obtener el botón con id "reversebtn"
const reverseButton = document.getElementById("reversebtn");

// Agregar un evento click al botón para invertir el orden
reverseButton.addEventListener("click", function () {

  // Llamar a la función invertirOrden y pasarle los datos globales
  invertirOrden(datos);
});

// Resto del código...

// Llamar a la función getZelda al cargar la página
getZelda();

// Variable global para almacenar el estado de inversión
let datosInvertidos = false;

// Función para invertir o restaurar el orden de los datos
function toggleOrden(datos) {
  // Si los datos están invertidos, restaurar el orden original
  if (datosInvertidos) {
    // Ordenar eventos por año (ascendente)
    datos.sort((a, b) => a.date - b.date);
  } else {
    // Si no, invertir el orden
    datos.sort((a, b) => b.date - a.date);
  }

  // Cambiar el estado de inversión
  datosInvertidos = !datosInvertidos;

  // Llamar a la función para actualizar el DOM con los datos
  updateTimeline(datos);

  // Imprimir mensaje en la consola
  console.log(`Datos ${datosInvertidos ? 'invertidos' : 'restaurados'} en la línea de tiempo:`, datos);
}

// ...

// Agregar un evento click al botón para invertir o restaurar el orden
reverseButton.addEventListener("click", function () {

  // Llamar a la función toggleOrden y pasarle los datos globales
  toggleOrden(datos);
});
