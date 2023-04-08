const {Task,User} = require('../models/todo_app_db');


// Controller for home page 

module.exports.home = function (req, res) {
    // res.end("<h1>This Is My Homepage</h1>")
    res.render('home',{
        title:'Home Page'
    })
}


// DISPLAY SIGN IN 
module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    res.render('sign-in',{
        title : 'Sign In'
    })
}

// DISPLAY SIGN UP 
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    res.render('sign-up',{
        title : 'Sign Up'
    })
}

// ADD THE USER VIA SIGN UP FORM 
module.exports.addUser = function(req,res){
    if(req.body.password!=req.body.confirm_password){
        console.log('password not same as confirm password');
        return res.redirect('back');
    }

    User.findOne({email:req.body.email})
    .then(user=>{
        if(!user){
            User.create(req.body)
            .then(user=>{
                console.log('*********',user);
                return res.redirect('/sign-in');
            })
            .catch(err=>{
                console.log('Unable to create User in database');
                return res.redirect('back');
            })
        }
        else{
            console.log('User Already Exist');
            res.send("User already Exist");
        }
    })
    .catch(err=>{
        console.log("Unable to toggle database");
        return res.redirect('back');
    })

}






