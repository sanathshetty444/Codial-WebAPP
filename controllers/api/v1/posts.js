const Posts=require('../../../models/posts');
const Comment=require('../../../models/comment');

module.exports.postdelete=async function(req,res){

    try
    {   
        
        let post=await Posts.findById(req.params.id)
        if(post.user==req.user.id)
        {
            post.remove();

        let comment =await Comment.deleteMany({post:req.params.id});
        
        return res.status(200).json({
            message:"Post deleted successfully"
        })

        }
        else
        {
            return res.status(401).json({
                message:"Unauthorized"
            })

        }


        
    }
    catch(err)
    {

        console.log("error in deleting posts",err);
        return res.status(500).json({
            message:"Internal servor error"
        })
    }

}

module.exports.index=async function(req,res){

     
   let posts=await Posts.find({})
   .sort('-createdAt')
   .populate('user')
   .populate({
      path:'comments',
      populate:{
         path:'user'
      }
   })
   
    return res.status(200).json({
        message:"hi there",
        posts:posts
    })
}