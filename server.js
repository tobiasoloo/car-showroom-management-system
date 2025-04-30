// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// GET /cars - Fetch all available cars
app.get('/cars', (req, res) => {
  const query = 'SELECT * FROM cars WHERE is_available = TRUE';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// POST /cars - Add a new car
app.post('/cars', (req, res) => {
    const { make, model, year, license_plate, daily_rate } = req.body;
    const query = 'INSERT INTO cars (make, model, year, license_plate, daily_rate, is_available) VALUES (?, ?, ?, ?, ?, TRUE)';
    db.query(query, [make, model, year, license_plate, daily_rate], (err, results) => {
      if (err) throw err;
      res.status(201).json({ message: 'Car added successfully', car_id: results.insertId });
    });
  });

  // PUT /cars/:car_id - Update car details
app.put('/cars/:car_id', (req, res) => {
    const { make, model, year, license_plate, daily_rate, is_available } = req.body;
    const carId = req.params.car_id;
    const query = 'UPDATE cars SET make = ?, model = ?, year = ?, license_plate = ?, daily_rate = ?, is_available = ? WHERE car_id = ?';
    db.query(query, [make, model, year, license_plate, daily_rate, is_available, carId], (err, results) => {
      if (err) throw err;
      res.json({ message: 'Car updated successfully' });
    });
  });

  // DELETE /cars/:car_id - Remove a car
app.delete('/cars/:car_id', (req, res) => {
    const carId = req.params.car_id;
    const query = 'DELETE FROM cars WHERE car_id = ?';
    db.query(query, [carId], (err, results) => {
      if (err) throw err;
      res.json({ message: 'Car deleted successfully' });
    });
  });

  // POST /bookings - Create a new booking
app.post('/bookings', (req, res) => {
    const { car_id, client_id, start_date, end_date, total_cost } = req.body;
  
    // Check car availability
    const availabilityQuery = 'SELECT * FROM bookings WHERE car_id = ? AND ((start_date <= ? AND end_date >= ?) OR (start_date <= ? AND end_date >= ?))';
    db.query(availabilityQuery, [car_id, start_date, start_date, end_date, end_date], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        return res.status(400).json({ message: 'Car is not available for the selected dates' });
      }
  
      // Create booking
      const bookingQuery = 'INSERT INTO bookings (car_id, client_id, start_date, end_date, total_cost, status) VALUES (?, ?, ?, ?, ?, "Active")';
      db.query(bookingQuery, [car_id, client_id, start_date, end_date, total_cost], (err, results) => {
        if (err) throw err;
  
        // Update car availability
        const updateCarQuery = 'UPDATE cars SET is_available = FALSE WHERE car_id = ?';
        db.query(updateCarQuery, [car_id], (err, results) => {
          if (err) throw err;
          res.status(201).json({ message: 'Booking created successfully', booking_id: results.insertId });
        });
      });
    });
  });

  // GET /bookings/:booking_id - Fetch booking details
app.get('/bookings/:booking_id', (req, res) => {
    const bookingId = req.params.booking_id;
    const query = 'SELECT * FROM bookings WHERE booking_id = ?';
    db.query(query, [bookingId], (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    });
  });

  // PUT /bookings/:booking_id - Update booking status
app.put('/bookings/:booking_id', (req, res) => {
    const bookingId = req.params.booking_id;
    const { status } = req.body;
    const query = 'UPDATE bookings SET status = ? WHERE booking_id = ?';
    db.query(query, [status, bookingId], (err, results) => {
      if (err) throw err;
  
      // If booking is completed, update car availability
      if (status === 'Completed') {
        const carIdQuery = 'SELECT car_id FROM bookings WHERE booking_id = ?';
        db.query(carIdQuery, [bookingId], (err, results) => {
          if (err) throw err;
          const carId = results[0].car_id;
          const updateCarQuery = 'UPDATE cars SET is_available = TRUE WHERE car_id = ?';
          db.query(updateCarQuery, [carId], (err, results) => {
            if (err) throw err;
            res.json({ message: 'Booking status updated and car availability updated' });
          });
        });
      } else {
        res.json({ message: 'Booking status updated' });
      }
    });
  });

  // Code to start the server
  const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});