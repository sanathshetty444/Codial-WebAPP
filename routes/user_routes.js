const express=require('express');
const user_router=express.Router();
const user=require('../controllers/user_controller');
const passport=require('passport');


user_router.get('/',function(req,res){
    res.end('<h1>user</h1>');
})
user_router.get('/profile',passport.checkAuthenticaton,user.profile);
user_router.get('/signup',user.signup);
user_router.get('/signin',user.signin);
user_router.post('/signup-action',user.signup_action);

//use passpor as amiddleware to authenticate
user_router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'},
),user.createSession)



module.exports=user_router;