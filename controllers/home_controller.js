// Controller for home page 
module.exports.home = function(req,res){
    // res.end("<h1>This Is My Homepage</h1>")
    res.render('home',{
        title : "TODO App"
    })
}

// COntroller to add a Work to list 
module.exports.add = function(req,res){
    console.log("Add work to list");
    res.redirect('back');
}

// Controller to delete a work from list 
module.exports.delete = function(req,res){
    console.log("Delete the selected work");
    res.redirect('back');
}