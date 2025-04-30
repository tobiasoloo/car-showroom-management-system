// src/components/AdminBookings.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const response = await axios.get('http://localhost:3001/bookings');
    setBookings(response.data);
  };

  return (
    <div>
      <h2>All Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.booking_id}>
            Booking ID: {booking.booking_id}, Car ID: {booking.car_id}, Client ID: {booking.client_id}, Status: {booking.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminBookings;