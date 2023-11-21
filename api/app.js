require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes); // Use a separate route file for user-related routes

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is up and running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
