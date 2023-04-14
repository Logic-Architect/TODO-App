const {Task,User} = require('../models/todo_app_db');


// Controller for home page 

module.exports.home = function (req, res) {
    // res.end("<h1>This Is My Homepage</h1>")
    // req.flash('welcome','Welcome ')
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
        // return res.redirect('back');
        req.flash('error','Passwords do not Match');
        return res.redirect('back')
        // res.render('error',{
        //     title:'Error',
        //     layout:'layout',
        //     error:'Passwords Do Not Match'
        // })
    }

    User.findOne({email:req.body.email})
    .then(user=>{
        if(!user){
            User.create(req.body)
            .then(user=>{
                console.log('*********',user);
                req.flash('success','You have Successfully Signed Up dear '+ user.username)
                return res.redirect('/sign-in');
            })
            .catch(err=>{
                console.log('Unable to create User in database');
                req.flash('error','Unable to create User in database');
                return res.redirect('back');
            })
        }
        else{
            console.log('User Already Exist');
            req.flash('error','User Already Exist');
            return res.redirect('back');
            // return res.render('error',{
            //     title:'Error',
            //     layout: 'layout',
            //     error : 'User Already Exist'
            // });
        }
    })
    .catch(err=>{
        console.log("Unable to toggle database");
        req.flash('error','Unable TO toggle Database')
        return res.redirect('back');
    })

}






;