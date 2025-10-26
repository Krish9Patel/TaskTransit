const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// MongoDB connection
const mongoURI = process.env.MONGO_URL || process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));
  
// Import and use the taskRoutes from server/routes/
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);
