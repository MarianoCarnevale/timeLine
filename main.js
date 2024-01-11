"use strict";

const url = "./zelda.json";

function getZelda() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Ordenar eventos por año
      data.sort((a, b) => a.date - b.date);
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
