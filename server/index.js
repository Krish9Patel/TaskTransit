// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

const cors = require('cors');
app.use(cors());

// 1) Serve static files from the *parent* folder (..)
app.use(express.static(path.join(__dirname, '..')));

// 2) Send index.html (which is in the parent folder) on root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// 3) Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// MongoDB connection
const mongoURI = process.env.MONGO_URL || process.env.MONGO_URI;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Import and use the taskRoutes from server/routes/
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);
