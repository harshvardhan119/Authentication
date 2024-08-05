const express = require('express');
const Car = require('../models/Car');
const router = express.Router();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

const admin = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).send('Access denied.');
  next();
};

router.post('/', [auth, admin], async (req, res) => {
  const { carName, manufacturingYear, price } = req.body;
  const car = new Car({ carName, manufacturingYear, price });
  await car.save();
  res.status(201).send('Car created');
});

router.get('/', auth, async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

router.put('/:id', [auth, admin], async (req, res) => {
  const { carName, manufacturingYear, price } = req.body;
  const car = await Car.findByIdAndUpdate(req.params.id, { carName, manufacturingYear, price }, { new: true });
  res.json(car);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.send('Car deleted');
});

module.exports = router;
