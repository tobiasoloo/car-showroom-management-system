// src/pages/AdminPage.js
import React from 'react';
import AdminCarForm from '../components/AdminCarForm';
import AdminBookings from '../components/AdminBookings';

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Interface</h1>
      <AdminCarForm />
      <AdminBookings />
    </div>
  );
};

export default AdminPage;