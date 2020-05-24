const Posts=require('../models/posts');






module.exports.home=async function(req,res){

   
   let posts=await Posts.find({})
   .sort('-createdAt')
   .populate('user')
   .populate({
      path:'comments',
      populate:{
         path:'user'
      }
   })
   
       return res.render('home',{posts:posts});
}