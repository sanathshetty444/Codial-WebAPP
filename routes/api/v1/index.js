const express=require('express');
const router=express.Router();
const passport=require('passport');
const user_v1=require('../../../controllers/api/v1/users');
const post_v1=require('../../../controllers/api/v1/posts');
router.get('/posts',post_v1.index);
router.delete('/destroy/:id', passport.authenticate('jwt', {session: false}),post_v1.postdelete);
router.post('/signin',user_v1.signin);
module.exports=router;