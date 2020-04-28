const express=require('express');
const user_router=express.Router();
const user=require('../controllers/user_controller');
user_router.get('/',function(req,res){
    res.end('<h1>user</h1>');
})
user_router.get('/profile',user.profile);
user_router.get('/name',user.name);
module.exports=user_router;