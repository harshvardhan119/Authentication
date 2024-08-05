import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const res = await axios.get(`${window.location.origin}/api/cars`, { headers: { Authorization: localStorage.getItem('token') } });
      setCars(res.data);
    };

    fetchCars();
  }, []);

  return (
    <div>
      <h2>Cars</h2>
      <ul>
        {cars.map(car => (
          <li key={car._id}>{car.carName} - {car.manufacturingYear} - ${car.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cars;
