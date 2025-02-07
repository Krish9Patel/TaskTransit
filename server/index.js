const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const app = express();

// Middleware to parse JSON
app.use(express.json());

const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
      ? 'https://task-flow.fly.dev'  // deployed frontend URL
      : 'http://localhost:8080',         // Adjust this if your local frontend runs on another port
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));

// Route
app.get('/', (req, res) => {
    res.send('Task Flow Backend is Running')
});


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Database connection error:', err));

// Import and use task routes
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

// Start the server on specified port (Fly uses port 8080)
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
