

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [carName, setCarName] = useState('');
  const [manufacturingYear, setManufacturingYear] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      const res = await axios.get(`${window.location.origin}/api/cars`, { headers: { Authorization: localStorage.getItem('token') } });
      setCars(res.data);
    };

    fetchCars();
  }, []);

  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${window.location.origin}/api/cars`, { carName, manufacturingYear, price }, { headers: { Authorization: localStorage.getItem('token') } });
      setCarName('');
      setManufacturingYear('');
      setPrice('');
      const res = await axios.get(`${window.location.origin}/api/cars`, { headers: { Authorization: localStorage.getItem('token') } });
      setCars(res.data);
    } catch (err) {
      alert('Error adding car');
    }
  };

  const handleUpdateCar = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${window.location.origin}/api/cars/${selectedCar._id}`, { carName, manufacturingYear, price }, { headers: { Authorization: localStorage.getItem('token') } });
      setSelectedCar(null);
      setCarName('');
      setManufacturingYear('');
      setPrice('');
      const res = await axios.get(`${window.location.origin}/api/cars`, { headers: { Authorization: localStorage.getItem('token') } });
      setCars(res.data);
    } catch (err) {
      alert('Error updating car');
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      await axios.delete(`${window.location.origin}/api/cars/${carId}`, { headers: { Authorization: localStorage.getItem('token') } });
      const res = await axios.get(`${window.location.origin}/api/cars`, { headers: { Authorization: localStorage.getItem('token') } });
      setCars(res.data);
    } catch (err) {
      alert('Error deleting car');
    }
  };

  const selectCar = (car) => {
    setSelectedCar(car);
    setCarName(car.carName);
    setManufacturingYear(car.manufacturingYear);
    setPrice(car.price);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <form onSubmit={selectedCar ? handleUpdateCar : handleAddCar}>
        <input type="text" placeholder="Car Name" value={carName} onChange={(e) => setCarName(e.target.value)} required />
        <input type="number" placeholder="Manufacturing Year" value={manufacturingYear} onChange={(e) => setManufacturingYear(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <button type="submit">{selectedCar ? 'Update Car' : 'Add Car'}</button>
      </form>
      <ul>
        {cars.map(car => (
          <li key={car._id}>
            {car.carName} - {car.manufacturingYear} - ${car.price}
            <button onClick={() => selectCar(car)}>Edit</button>
            <button onClick={() => handleDeleteCar(car._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
