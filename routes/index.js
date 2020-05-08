const express=require('express');
const router=express.Router();

const home_controller=require('../controllers/home_controller');
router.get('/',home_controller.home);

router.use('/user',require('./user_routes'));
//router.use('/name',require('./user_routes'));
module.exports=router;