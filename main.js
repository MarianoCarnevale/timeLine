"use strict";

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

window.addEventListener("scroll", () => {
  if (this.scrollY >= 85) {
    navMenu.classList.add("on-scroll");
  } else {
    navMenu.classList.remove("on-scroll");
  }
});

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
        const container = document.createElement("div");
        container.className = "card-container";

        // Círculo de la línea de tiempo
        const timelineCircle = document.createElement("div");
        timelineCircle.className = "timeline-circle";

        // Tarjeta
        const card = document.createElement("div");
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
