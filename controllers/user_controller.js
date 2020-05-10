module.exports.signup=function(req,res){
    return res.render('user-signup');
}
module.exports.signin= function(req,res) {
    //console.log(req.cookies.codial);
    if(req.isAuthenticated()){
        return res.redirect('/user/profile')
    }
    
    return res.render('user-signin');
}
const User=require('../models/codial');
const Posts=require('../models/posts');
module.exports.signup_action=function(req,res){

    console.log("IN LOL");
    console.log(req.cookies);
    User.create({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email
    },function(err,user){
        if(err)
        {
            console.log("Error",err);
            return;
        }
        console.log("********",user);
        res.cookie('user_id',user._id);
        return res.render('user-signin');
    })

    
}

module.exports.createSession=function(req,res){


    return res.redirect('profile');
}
module.exports.profile=function(req,res){
    var b=req.user._id;

    Posts.find({user:{$eq:b}},function(err,c){
        if(err)
        {
            console.log("error in displaying posts",err);
            return;
        }
        return res.render('profile',{posts:c});

    })
    
}
module.exports.signout=function(req,res){

    req.logout();
    console.log("lol");
    res.redirect('/user/signin');
}
module.exports.addposts=function(req,res){
    Posts.create({
        content:req.body.posts,
        user:req.user._id
    },function(err,posts)
    {
       
        if(err)
        {
            console.log("error in creating post",err);
            return;
        }
        console.log("***********",posts);
       
        
        
    })
     res.redirect('back');
}