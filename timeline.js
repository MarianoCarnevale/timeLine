"use strict";
document.addEventListener("scroll", function () {
  var timelineContainer = document.querySelector(".timeline-container");
  var timeline = document.querySelector(".timeline");
  var scrollPosition = window.scrollY;

  // Define el punto en el que la línea empezará a mostrarse (en la mitad de la pantalla)
  var showPoint = window.innerHeight / 100;

  // Calcula la distancia desde el punto de inicio hasta la posición actual del scroll
  var distanceFromShowPoint = Math.max(scrollPosition - showPoint);
  console.log(distanceFromShowPoint);

  // Calcula el porcentaje de distancia en relación con la altura del contenedor
  var percentage =
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
