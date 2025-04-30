// src/pages/ClientPage.js
import React from 'react';
import CarList from '../components/CarList';
import BookingHistory from '../components/BookingHistory';

const ClientPage = () => {
  return (
    <div>
      <h1>Client Interface</h1>
      <CarList />
      <BookingHistory />
    </div>
  );
};

export default ClientPage;