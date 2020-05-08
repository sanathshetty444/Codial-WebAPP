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
    return res.end('<h1>succesfull</h1>');
}
module.exports.profile=function(req,res){
    return res.render('profile');
}
