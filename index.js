// Importing required libraries
const { urlencoded } = require('body-parser');
const express = require('express');
const port = 8000;

// Connecting the database 
const db = require('./config/mongoose');

// Initialising Express
const app =express();

// Setting up the View Engine :EJS 
app.set('view engine','ejs');
app.set('views','./views');

// Using Middleware to decode the URL Encoded sent by the user 
app.use(urlencoded());

// Using the static files 
app.use(express.static('asset'));

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