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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect((process.env.MONGO_URI), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Database connection error:', err));

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);