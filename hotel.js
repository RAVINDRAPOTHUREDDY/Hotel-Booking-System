function submitForm() {
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const checkIn = document.getElementById('checkIn').value;
  const checkOut = document.getElementById('checkOut').value;
  const roomType = document.getElementById('roomType').value;

  // Simulate a request to the server (replace this with actual server communication)
  const formData = {
    name: name,
    email: email,
    checkIn: checkIn,
    checkOut: checkOut,
    roomType: roomType,
  };

  // Simulate a response from the server (replace this with actual server communication)
  const serverResponse = {
    success: true,
    message: 'Booking submitted successfully!',
  };

  handleServerResponse(serverResponse);
}

function handleServerResponse(response) {
  const confirmationMessage = document.getElementById('confirmationMessage');
  confirmationMessage.textContent = response.message;
  confirmationMessage.style.color = response.success ? '#008000' : '#FF0000';
}
