const express=require('express');
const user_router=express.Router();
const user=require('../controllers/user_controller');
const passport=require('passport');


user_router.get('/',function(req,res){
    res.end('<h1>user</h1>');
})
user_router.get('/profile/:id',passport.checkAuthenticaton,user.profile);
user_router.get('/signup',user.signup);
user_router.get('/signin',user.signin);
user_router.post('/signup-action',user.signup_action);

//use passpor as amiddleware to authenticate
user_router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/signup'},
),user.createSession)
user_router.get('/signout',user.signout);
user_router.post('/addpost',passport.checkAuthenticaton,user.addposts);
user_router.post('/addcomment',user.comment);
user_router.get('/postdelete/:id',user.postdelete);
user_router.get('/commentdelete/:id',user.commentdelete);
user_router.post('/update/:id',user.update);

user_router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
user_router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/user/signin'}),user.createSession)

module.exports=user_router;