"use strict";
document.addEventListener("scroll", function () {
  let timelineContainer = document.querySelector(".timeline-container");
  let timeline = document.querySelector(".timeline");
  let scrollPosition = window.scrollY;

  // Define el punto en el que la línea empezará a mostrarse (en la mitad de la pantalla)
  let showPoint = window.innerHeight / 100;

  // Calcula la distancia desde el punto de inicio hasta la posición actual del scroll
  let distanceFromShowPoint = Math.max(scrollPosition - showPoint);
  console.log(distanceFromShowPoint);

  // Calcula el porcentaje de distancia en relación con la altura del contenedor
  let percentage =
    (distanceFromShowPoint / (timelineContainer.clientHeight / 2)) * 100;

  if (percentage > 0) {
    timeline.classList.add("show");
  }
  // else {
  //   timeline.classList.remove("show");
  // }

  // Actualiza la altura del contenedor según la distancia desde el punto de inicio
  timelineContainer.style.height = 2 + percentage / 1 + "rem";
});