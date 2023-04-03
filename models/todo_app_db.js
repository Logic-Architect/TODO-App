const mongoose = require('mongoose');
 
const taskSchema = new mongoose.Schema({
    description : {
        type : String,
        required : true
    },
    category : {
        type : String
    },
    d_date: {
        type : Date,
        required : true
    }
})

const Task = mongoose.model('Task', taskSchema);

// Exporting the Schema 
module.exports = Task;
