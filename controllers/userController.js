const{Task , User} = require('../models/todo_app_db');


// CREATE SESSION 
module.exports.createSession = function(req,res){

    // TODO CREATE A SESSION
    req.flash('success','Successfully Signed In as '+req.user.username)
    return res.redirect('/user/profile');
}

module.exports.profile = function(req,res){
  
    req.flash('success','Successfully Signed In as '+req.user.username)
    Task.find({email : req.user.email})
    .then(user=>{
        res.render('userProfile',{
            layout : 'userProfileLayout',
            title : 'User Profile',
            task : user
        })
    })
    
}


module.exports.add =function(req,res){

    // console.log(req.query.email);
    console.log(req.user.email);

    Task.create(
        {
            email:req.query.email,
            description : req.body.description,
            category:req.body.category,
            d_date : req.body.d_date
        }
        )
    .then(user=>{
        console.log('*****',req.body);
        req.flash('success','Task Added Successfully')
        return res.redirect('back');
    })
    .catch(err=>{
        console.log('Error creating a task',err);
        req.flash('error','Unable to add Task')
        return res.redirect('back');
    })
}

module.exports.delete = function(req,res){
    console.log(typeof(req.body['id']));
    console.log(req.body.id);
    

    let del = (element) => {
        console.log(element)
        Task.findByIdAndDelete(element)
        .then(data=>{
            console.log('*');
        })
        .catch(err=>{
            console.log('Unable to delete',err);
            req.flash('error','Unable to Delete Task at the moment')
        })
    }

    if(typeof(req.body.id)=='string'){
        del(req.body.id);
        req.flash('success','Task deleted Successfully');
    }
    else{
        req.body.id.forEach(del);
        req.flash('success','Task deleted Successfully');
    }
    return res.redirect('back')
}

module.exports.signout = function(req,res){
    req.logout(err=>{
        if(err){
            return next(err);
        }
        req.flash('success','You are Successfully Logged Out')
        return res.redirect('/');
    })
}