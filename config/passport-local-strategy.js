const {Task,User} = require('../models/todo_app_db');

const passport = require('passport');
const LocalStrategy =require('passport-local').Strategy;


// AUTHENTICATE USING PASSPORT 
passport.use(new LocalStrategy({
    usernameField : 'email',
    passReqToCallback:true
    },
    function(req,email,password,done){
        User.findOne({email: email})
        .then(user=>{
            if(!user || user.password!=password){
                req.flash('error','Invalid UserName/Password');
                console.log('Invalid Username/Password');
                return done(null,false);
            }
            req.flash('success','Logged In Successfully');
            done(null,user);
        })
        .catch(err=>{
            req.flash('error','Error finding User');
            console.log('Error in finding User');
            return done(err);
        })
    }
))

// SERIALIZE THE USER AND DECIDE WHICH KEY TO KEPT FOR AUTHENTICATION 
passport.serializeUser(function(user,done){
    done(null,user.id);
})

// DESERIALIZE THE USER FROM THE KEY IN THE COOKIES 
passport.deserializeUser(function(id,done){
    User.findById(id)
    .then(user=>{
        done(null,user)
    })
    .catch(err=>{
        console.log('Unable to authenticate USER-->passport');
        return done(err);
    })
})

// CHECK IF THE USER IS AUTHENTICATED 
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/sign-in');
}

// SET THE AUTHENTICATED USER TO BE ACCESSED IN VIEWS 
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports =passport;