console.log('El archivo JavaScript se ha cargado correctamente.');

function submitForm() {
  console.log('La función submitForm se ha llamado correctamente.');

  var name = document.getElementById('name').value;
  var lastname = document.getElementById('lastname').value;
  var email = document.getElementById('email').value;
  var telephone = document.getElementById('tel').value;
  var message = document.getElementById('message').value;
  
  if (!/^[0-9]+$/.test(telephone)) {
    alert('Please enter a valid telephone number (numbers only).');
    return;}
  if (!name || !lastname || !email || !telephone || !message) {
    alert('Please fill out all required fields.');
  } else {
    var formData = {
      name: name,
      lastname: lastname,
      email: email,
      telephone: telephone,
      message: message,
    };

    localStorage.setItem('formData', JSON.stringify(formData));

    alert('Submitted successfully.');

    document.getElementById('contactForm').reset();
  }

  var formDataString = localStorage.getItem('formData');
  var formDataObject = JSON.parse(formDataString);
  console.log(formDataObject);
}