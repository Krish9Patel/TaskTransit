const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

const cors = require('cors');
app.use(cors());

// Route
app.get('/', (req, res) => {
    res.send('index.html') 
});

// Starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const mongoURI = process.env.MONGO_URL || process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);