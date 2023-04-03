// Importing required libraries
const express = require('express');
const port = 8000;

// Initialising Express
const app =express();

// Using Middleware to handle Get Request and directing them to Routes 
app.use('/',require('./routes/index'));

// Listening to the Port 
app.listen(port , (err)=>{
    if(err){
        console.log(`Error Connecting To Server ${err}`);
        return;
    }
    console.log(`Successfully connected to the server at port ${port}`);
})