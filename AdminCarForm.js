// src/components/AdminCarForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AdminCarForm = () => {
  const [car, setCar] = useState({ make: '', model: '', year: '', license_plate: '', daily_rate: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/cars', car);
    alert('Car added successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Make" value={car.make} onChange={(e) => setCar({ ...car, make: e.target.value })} required />
      <input type="text" placeholder="Model" value={car.model} onChange={(e) => setCar({ ...car, model: e.target.value })} required />
      <input type="number" placeholder="Year" value={car.year} onChange={(e) => setCar({ ...car, year: e.target.value })} required />
      <input type="text" placeholder="License Plate" value={car.license_plate} onChange={(e) => setCar({ ...car, license_plate: e.target.value })} required />
      <input type="number" placeholder="Daily Rate" value={car.daily_rate} onChange={(e) => setCar({ ...car, daily_rate: e.target.value })} required />
      <button type="submit">Add Car</button>
    </form>
  );
};

export default AdminCarForm;