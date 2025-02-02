const mongoose = require('mongoose');

// Schema of the data for the website
const TaskSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Task Name required'] 
    },
    
    description: { 
        type: String, 
        required: false 
    },
    
    start: { 
        type: Date, 
        required: [true, 'Start Date required'],
        validate: {
            validator: function(value) {
               return value < this.end;
            },
            message: 'Start date must be before end date'
        }
    },
    
    end: { 
        type: Date, 
        required: [true, 'End Date required']
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);