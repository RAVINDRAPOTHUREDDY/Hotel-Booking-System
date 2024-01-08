const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (replace 'your_connection_string' with your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/hotelManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema for the bookings
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  checkIn: Date,
  checkOut: Date,
  roomType: String,
});

// Create a model based on the schema
const Booking = mongoose.model('Booking', bookingSchema);

// Middleware for parsing JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint for form submission
app.post('/submitForm', (req, res) => {
  // Get form values from the request body
  const { name, email, checkIn, checkOut, roomType } = req.body;

  // Create a new booking instance
  const newBooking = new Booking({
    name: name,
    email: email,
    checkIn: checkIn,
    checkOut: checkOut,
    roomType: roomType,
  });

  // Save the booking to the database
  newBooking.save((err) => {
    if (err) {
      console.error('Error saving booking:', err);
      res.status(500).json({ success: false, message: 'Error submitting booking. Please try again.' });
    } else {
      res.status(200).json({ success: true, message: 'Booking submitted successfully!' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
