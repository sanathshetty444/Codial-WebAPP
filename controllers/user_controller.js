module.exports.signup=function(req,res){
    return res.render('user-signup');
}
module.exports.signin= function(req,res) {
    //console.log(req.cookies.codial);
    if(req.isAuthenticated()){
        return res.redirect('/')
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

    req.flash('success','logged in succesfully');


    return res.redirect('/');
}
module.exports.signout=function(req,res){

    req.logout();
    req.flash('success','logged out succesfully');
    console.log("lol");
    res.redirect('/user/signin');
}



//profile page opertions



module.exports.profile= async function(req,res){
    var b=req.user._id;

    let user= await User.findById(req.params.id);
       
    

    let posts = await Posts.find({user:{$eq:req.params.id}}).populate('user')
            .populate({
                path:'comments',
                populate:{
                    path:'user'
                }
            })
        
     return res.render('profile',{posts:posts,name:user});

            



            

        
    
    
}





module.exports.addposts= async function(req,res){
   try
   {
       let post=  await Posts.create({
        content:req.body.posts,
        user:req.user._id
       
        });
       let user= await User.findById(req.user.id);
       console.log(user.name);

       
        if (req.xhr){
            return res.status(200).json({
                data: {
                    post: post,
                    user:user.name
                },
                message: "Post created!"
            });
        }
        

        req.flash('success','Post added successfully');

        res.redirect('/');
   }
   catch(err){
    console.log("error in creating post",err);
    return res.redirect('back')
   }
}


module.exports.populate_user_name_by_user_in_posts=function(req,res){
    Posts.find({}).populate('user').exec(function(err,posts)
    {
        if(err)
        {
            console.log("error in poupulated user info by user id in posts",err);
        }
        return res.render('profile',{posts:posts});
    })
}




// comment action controller for the user

const Comment = require('../models/comment');
const commentmailer=require('../mailers/comments');

module.exports.comment= async function(req,res){
    
   // console.log(req.user._id);
   try
   {
        let comment=await Comment.create({

            content:req.body.comment,
            user:req.user._id,
            post:req.body.post
        });

        let post=await Posts.findById(req.body.post,function(err,post){

                if(err){return};
                post.comments.push(comment);
                post.save();
            });
        let user=await User.findById(req.user.id);
        //console.log(user);
        comment_email=await Comment.findById(comment.id).populate('user');
        //console.log("***********",comment_email);
        commentmailer.newComment(comment_email);



        if(req.xhr){
            return res.status(200).json({
                 data:{
                        comment:comment,
                        user:user.name
                    },
                    message:"commented"
            });
        }



            req.flash('success','Comment added sccessfully');

            return res.redirect('/');
     }
     catch(err){
         console.log("error in adding comments",err);

     }
}


// Deletion of posts

module.exports.postdelete=async function(req,res){

    try
    {   
        let post=await Posts.findById(req.params.id)


        post.remove();

        let comment =await Comment.deleteMany({post:req.params.id});

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:req.params.id
                },
                message:"post deleted"
            })
        }

        
        
        req.flash('success','Post deleted successfully');
        return res.redirect('/');
    }
    catch(err)
    {
        console.log("error in deleting posts",err);
    }

}


// comment delete

module.exports.commentdelete=async function(req,res){

    try
    {
        let comment= await Comment.findById(req.params.id)
        

        let postid=comment.post;
            
        let post=await Posts.findByIdAndUpdate(postid,{$pull:{comments:req.params.id}});

        comment.remove();

        if(req.xhr){
            return res.status(200).json({
                data:{
                    comment:req.params.id
                },
                message:"post deleted"
            })
        }
        

        
        req.flash('success','Comment deleted succesfully');

        
        
        return res.redirect('/');
    }
    catch(err)
    {
        console.log("error found in deleting comments",err);
    }
}

// update info of the user
const fs = require('fs');
const path=require('path');
module.exports.update=async function(req,res)
{
    try{

    
        let user=await User.findById(req.params.id);
        console.log(user);
        User.updateAvatar(req,res,function(){
            user.name=req.body.name;
            user.email=req.body.email;
            

            if(req.file){
                if(user.avatar!=null && fs.existsSync(path.join(__dirname,"..",user.avatar))){
                    console.log("yes lol");
                    console.log(__dirname);
                    fs.unlinkSync(path.join(__dirname,"..",user.avatar));
                }


                user.avatar=User.avatarPath+'/'+req.file.filename;
            }
            user.save();
            req.flash('success','updated succesfully');

            return res.redirect('/');

        })




        
    }
    catch(err)
    {
        console.log("error in updation",err);
    }
}


