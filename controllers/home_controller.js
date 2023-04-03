const Task = require('../models/todo_app_db');

// Controller for home page 
module.exports.home = function(req,res){
    // res.end("<h1>This Is My Homepage</h1>")
   Task.find({})
   .then(data=>{
    res.render('home',{
        title : "TODO App",
        task : data
    })
   })
}

// COntroller to add a Work to list 
module.exports.add = function(req,res){
    // console.log("Add work to list");
    console.log(req.body);

    Task.create({
        description : req.body.description,
        category : req.body.category,
        d_date : req.body.d_date
    })
    .then(data=>{
        console.log('********');
        res.redirect('back');
    })

}

// Controller to delete a work from list 
module.exports.delete = function(req,res){
    console.log("Delete the selected work");
    res.redirect('back');
}