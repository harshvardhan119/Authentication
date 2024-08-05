const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require("path");

app.use(bodyParser.json());
app.use(cors());

// Replace with your MongoDB URI
mongoose.connect('mongodb+srv://harish1234:hrty@cluster0.dftl6th.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
app.get("/",(req,res)=>{
  app.use(express.static(path.resolve(__dirname,"quadiro-tech-frontend","build")));
  res.sendFile(path.resolve(__dirname,"quadiro-tech-frontend","build","index.html"));
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const userRoutes = require('./routes/user');
const carRoutes = require('./routes/car');

app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);