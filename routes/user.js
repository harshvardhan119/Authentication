const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, isAdmin } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, isAdmin });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send('Invalid credentials');
  }
  const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, 'secretKey', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
