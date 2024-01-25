// Función para agregar una tarjeta personalizada
function agregarTarjetaPersonalizada(event) {
  event.preventDefault();
  // Obtener detalles de la tarjeta del usuario desde los campos de formulario
  const titulo = document.getElementById("titulo").value;
  const fecha = document.getElementById("fecha").value;
  const texto = document.getElementById("texto").value;
  const imagenURL = document.getElementById("imagenURL").value;

  // Validar que los campos requeridos estén llenos
  if (!titulo || !fecha || !texto) {
    alert("Por favor, complete todos los campos obligatorios.");
    return;
  }

  // Crear un objeto con los detalles de la tarjeta
  const nuevaTarjeta = {
    title: titulo,
    date: fecha,
    text: texto,
  };

  nuevaTarjeta.image = imagenURL ? imagenURL : "./images/no_image.jpg";

  if (isNaN(fecha) || fecha.length !== 4 || parseInt(fecha) <= 1986) {
    // La fecha no es válida
    alert(
      "Ingrese una fecha válida de 4 cifras numéricas posterior al primer juego."
    );
    return;
  }

  // Agregar la nueva tarjeta al conjunto de datos
  datos.push(nuevaTarjeta);

  // Ordenar los datos y actualizar la línea de tiempo
  ordenarDatos();
  updateTimeline();

  // Guardar los datos actualizados en el localStorage
  guardarEnLocalStorage();
}
