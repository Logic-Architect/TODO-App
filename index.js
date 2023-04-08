// Importing required libraries
const { urlencoded } = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;

// Connecting the database 
const db = require('./config/mongoose');
const Task = require('./models/todo_app_db');

// Initialising Express
const app =express();

// Setting up the View Engine :EJS 
app.set('view engine','ejs');
app.set('views','./views');


// Using Middleware to decode the URL Encoded sent by the user 
app.use(urlencoded());

// Using the static files 
app.use(express.static('asset'));

// SETTING LAYOUTS 
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

app.set('layout layout',false);
app.set('layout userProfileLayout',false)

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// app.set('userProfileLayout extractStyles',true);
// app.set('userProfileLayout extractScripts',true);

// USED FOR SESSION COOKIE 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// MANIPULATING COOKIES 
app.use(cookieParser());

const MongoStore = require('connect-mongo');
app.use(session({
    name : 'TODO',
    secret : 'naman',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000*60*100)
    },
    store : new MongoStore(
        {
            mongoUrl : 'mongodb://127.0.0.1/todo_app_db'
        },
        {
            mongoConnection : db,
            autoRemove : 'disabled',
        },
        function(err){
            console.log(err || 'Connect mongo setup okk!')
        }
    )
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

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