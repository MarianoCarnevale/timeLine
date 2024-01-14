// "use strict";

// // Variable compartida con main.js
// // let datos;


// function cargarDatosEnLineaDeTiempo() {
//   const timeline = document.getElementById('timeline');
//   timeline.innerHTML = '';

//   if (datos) {
//     datos.forEach(function (juego) {
//       const li = document.createElement('li');
//       li.textContent = juego.nombre;
//       timeline.appendChild(li);
//     });
//   } else {
//     console.log('No se encontraron datos para cargar.');
//   }
// }

// function invertirOrden() {
//   if (datos) {
//     console.log('Datos antes de invertir:', datos);

//     datos.reverse(); // Invierte el orden solo si datos está definido

//     console.log('Datos después de invertir:', datos);

//     cargarDatosEnLineaDeTiempo();
//   } else {
//     console.log('No se encontraron datos para cargar.');
//   }
// }

// document.addEventListener("DOMContentLoaded", function () {
//    console.log('DOMContentLoaded ejecutado.');
//   // Asegúrate de que los datos se carguen antes de intentar invertir el orden
//   if (typeof datos !== 'undefined') {
//     cargarDatosEnLineaDeTiempo();

//     // Agrega un listener al botón para invertir el orden cuando se hace clic
//     const btnInvertir = document.getElementById('reversebtn');
//     btnInvertir.addEventListener('click', invertirOrden);

//     console.log('Botón de inversión de orden listo.');
//   } else {
//     console.error('No se encontraron datos para cargar.');
//   }
// });