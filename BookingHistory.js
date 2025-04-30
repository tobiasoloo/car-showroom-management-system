// src/components/BookingHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const response = await axios.get('http://localhost:3001/bookings?client_id=1'); // Replace with actual client ID
    setBookings(response.data);
  };

  return (
    <div>
      <h2>Booking History</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.booking_id}>
            Car ID: {booking.car_id}, Dates: {booking.start_date} to {booking.end_date}, Status: {booking.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingHistory;