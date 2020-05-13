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


    return res.redirect('profile');
}
module.exports.signout=function(req,res){

    req.logout();
    console.log("lol");
    res.redirect('/user/signin');
}



//profile page opertions



module.exports.profile=function(req,res){
    var b=req.user._id;

    User.findById(req.params.id,function(err,user){
       
    

        Posts.find({user:{$eq:req.params.id}}).populate('user')
            .populate({
                path:'comments',
                populate:{
                    path:'user'
                }
            }).exec(function(err,posts)
            {
                return res.render('profile',{posts:posts,name:user});

            })



            

        })
    
    
}





module.exports.addposts=function(req,res){
    Posts.create({
        content:req.body.posts,
        user:req.user._id,
       
    },function(err,posts)
    {
       
        if(err)
        {
            console.log("error in creating post",err);
            return;
        }
        console.log("***********",posts);
       
        
        
    })
     res.redirect('/');
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

module.exports.comment=function(req,res){
    
   // console.log(req.user._id);
    Comment.create({

        content:req.body.comment,
        user:req.user._id,
        post:req.body.post
    },function(err,comment){
        if(err)
        {
            console.log("error in making comments",err)
            return;
        }
        console.log("**********",comment);

        Posts.findById(req.body.post,function(err,post){

            if(err){return};
            post.comments.push(comment);
            post.save();
        })
        return res.redirect('/');



        
    })


}


// Deletion of posts

module.exports.postdelete=function(req,res){

    Posts.findById(req.params.id,function(err,post){
        if(err){console.log("error in deleting post",err);}

        post.remove();

        Comment.deleteMany({post:req.params.id},function(err){
            return res.redirect('/');

        })

    })
}


// comment delete

module.exports.commentdelete=function(req,res){


    Comment.findById(req.params.id,function(err,comment){

        let postid=comment.post;
        
        Posts.findByIdAndUpdate(postid,{$pull:{comments:req.params.id}},function(err,post){

            console.log(post);
        });

        comment.remove();

    })
    
    
    return res.redirect('/');
}

// update info of the user

module.exports.update=function(req,res)
{
    User.findByIdAndUpdate(req.params.id,{name:req.body.name,email:req.body.email},function(err,user){
        console.log(user);
    })
    return res.redirect('/');
}


