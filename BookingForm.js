// src/components/BookingForm.js
import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ carId }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:3001/bookings', {
      car_id: carId,
      client_id: 1, // Replace with actual client ID (e.g., from authentication)
      start_date: startDate,
      end_date: endDate,
      total_cost: 100, // Calculate based on daily rate and duration
    });
    alert('Booking created successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      <button type="submit">Book Now</button>
    </form>
  );
};

export default BookingForm;

