"use strict";

const url = "./zelda.json";
let datos;
let datosInvertidos = false;

function getZelda() {
  const reverseButton = document.getElementById("reversebtn");
  const resetButton = document.getElementById("resetbtn");

  reverseButton.addEventListener("click", toggleOrden);
  resetButton.addEventListener("click", resetTimeline);

  const localStorageData = localStorage.getItem("zeldaDatos");

  if (localStorageData) {
    datos = JSON.parse(localStorageData);
    updateTimeline();
  } else {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("zeldaDatos", JSON.stringify(data));
        datos = data;
        updateTimeline();
      })
      .catch((err) => console.error(err.message));
  }
}

function ordenarDatos() {
  datos.sort((a, b) => (datosInvertidos ? b.date - a.date : a.date - b.date));
}

function toggleOrden() {
  datosInvertidos = !datosInvertidos;
  ordenarDatos();
  updateTimeline();
}

function resetTimeline() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("zeldaDatos", JSON.stringify(data));
      datos = data;

      // Ordenar los datos después de cargarlos
      ordenarDatos();

      updateTimeline();
    })
    .catch((err) => console.error(err.message));
}
function eliminarEvento(index) {
  datos.splice(index, 1);
  updateTimeline();
  localStorage.setItem("zeldaDatos", JSON.stringify(datos));
}

function updateTimeline() {
  const timelineElement = document.getElementById("timeline");
  timelineElement.innerHTML = "";

  datos.forEach((evento, index) => {
    const container = document.createElement("li");
    container.className = "card-container";

    const timelineCircle = document.createElement("div");
    timelineCircle.className = "timeline-circle";

    const card = document.createElement("article");
    card.className = "card";

    if (evento.image) {
      const img = document.createElement("img");
      img.src = evento.image;
      card.appendChild(img);
    }

    const title = document.createElement("h3");
    title.textContent = evento.title;
    const date = document.createElement("p");
    date.textContent = `Fecha: ${evento.date}`;
    const text = document.createElement("p");
    text.textContent = evento.text;

    card.appendChild(title);
    card.appendChild(date);
    card.appendChild(text);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", () => eliminarEvento(index));

    card.appendChild(deleteButton);

    container.appendChild(timelineCircle);
    container.appendChild(card);
    timelineElement.appendChild(container);
  });
}

getZelda();
