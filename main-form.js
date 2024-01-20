"use strict";

console.log("El archivo JavaScript se ha cargado correctamente.");

function submitform(event) {
  event.preventDefault(); // Evitar el envío automático del formulario
  console.log("La función submitform se ha llamado correctamente.");

  const name = document.getElementById("name").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const telephone = document.getElementById("tel").value;
  const message = document.getElementById("message").value;

  if (!/^[0-9]+$/.test(telephone) || telephone.length < 9) {
    alert("Please enter a valid telephone number (numbers only).");
    return;
  }
  if (!/^[0-9]+$/.test(telephone) || telephone.length < 9) {
    alert(
      "Please enter a valid telephone number with at least 9 digits (numbers only)."
    );
    return false; //modificado
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false; // Evitar que el formulario se envíe
  }

  if (!name || !lastname || !email || !telephone || !message) {
    alert("Please fill out all required fields.");
    return false; //modificado
  } else {
    var formData = {
      name: name,
      lastname: lastname,
      email: email,
      telephone: telephone,
      message: message,
    };

    localStorage.setItem("formData", JSON.stringify(formData));

    alert("Submitted successfully.");

    document.getElementById("contactform").reset();
  }

  const formDataString = localStorage.getItem("formData");
  const formDataObject = JSON.parse(formDataString);
  console.log(formDataObject);
  return false;
}
