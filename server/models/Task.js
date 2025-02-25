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
                if (this.getUpdate) {
                    // Get the update object
                    const update = this.getUpdate();
                    // Prefer the update's end value if provided, else fallback to this.end (if it exists)
                    const endValue = update.end || this.end;
                    // If no endValue exists, skip validation (it will be caught by required validator)
                    if (!endValue) return true;
                    return new Date(value) < new Date(endValue);
                  }
                  // Otherwise, assume it's a normal save and compare as usual.
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