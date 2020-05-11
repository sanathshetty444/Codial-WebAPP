const Posts=require('../models/posts');






module.exports.home=function(req,res){

   
   Posts.find({})
   .populate('user')
   .populate({
      path:'comments',
      populate:{
         path:'user'
      }
   })
   .exec(function(err,posts)
   {
       if(err)
       {
           console.log("error in poupulated user info by user id in posts",err);
       }
       return res.render('home',{posts:posts});
   })
}