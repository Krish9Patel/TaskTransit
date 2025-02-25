const express = require('express');
const router = express.Router();
const Task = require('../models/Task')

// Create new task
router.post('/', async (req, res) => {
    try {
        const { name, description, start, end } = req.body;
        
        if (!name || !start || !end) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        if (start >= end) {
            return res.status(400).json({ error: "End date must be after start date" });
        }
        const newTask = new Task({ name, description, start, end });
        await newTask.save();
        res.status(201).json(newTask);
    } catch(error) {
        res.status(500).json({
            error: "Server error",
            details: error.message
        });
    }
});

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Tasks
router.put('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { 
                new: true,
                runValidators: true,  
                context: 'query'
            }
        );
        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete Tasks
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;