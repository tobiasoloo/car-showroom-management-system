// src/components/CarList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({ make: '', model: '', maxPrice: '' });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const response = await axios.get('http://localhost:3001/cars');
    setCars(response.data);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredCars = cars.filter((car) => {
    return (
      car.make.toLowerCase().includes(filters.make.toLowerCase()) &&
      car.model.toLowerCase().includes(filters.model.toLowerCase()) &&
      (filters.maxPrice ? car.daily_rate <= parseFloat(filters.maxPrice) : true)
    );
  });

  return (
    <div>
      <h2>Available Cars</h2>
      <div>
        <input type="text" name="make" placeholder="Filter by make" onChange={handleFilterChange} />
        <input type="text" name="model" placeholder="Filter by model" onChange={handleFilterChange} />
        <input type="number" name="maxPrice" placeholder="Max price" onChange={handleFilterChange} />
      </div>
      <ul>
        {filteredCars.map((car) => (
          <li key={car.car_id}>
            {car.make} {car.model} - ${car.daily_rate}/day
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;