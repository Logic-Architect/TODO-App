const mongoose = require('mongoose');
 
const taskSchema = new mongoose.Schema({
    email :{
        type : String,
        required :true
    },
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
},{
    timestamps:true 
})

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true 
    }
},{
    timestamps : true
})



const Task = mongoose.model('Task', taskSchema);
const User = mongoose.model('User',userSchema);

// Exporting the Schema 
module.exports = {Task , User}
