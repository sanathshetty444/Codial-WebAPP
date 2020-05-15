class comments{

    constructor(postid)
    {
        
        this.postid=postid;
        this.postcontainer=$('#post-list-container');
        this.post=$(`post-${postid}`);
        this.createcomment(postid);
        let self=this;
        $(' .delete-comment-button', self.postcontainer).each(function(){
            self.deletecomment($(this));
        })

    }

    createcomment(postid){
        //console.log(postid);
        let self=this;
        let commentid=$(`#new-comment-${postid}`);
        console.log(commentid);
        commentid.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/user/addcomment',
                data:commentid.serialize(),
                success:function(data){
                    console.log(data);
                    let newcomm=self.newcommdomm(data.data.comment,data.data.user);
                    $(`#post-comments-${postid}`).prepend(newcomm);
                    self.deletecomment($(' .delete-comment-button', newcomm));
                }
            })
        })
    }

    newcommdomm(comment,user)
    {

        console.log("okokok");
            return $(`<li id="comment-${comment._id}">
                        
                    
                            
                                
                        <a class="delete-comment-button" href="/user/commentdelete/${comment._id}">Y</a>
                            
                        
                        Comment done by : &nbsp <a href="/user/profile/${comment._id}"> ${user}</a>
                    
                        <h4>${comment.content}</h4>
                    </li>`)
    }

    deletecomment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),

                success:function(data){

                    $(`#comment-${data.data.comment}`).remove();
                    console.log(data);
                },error:function(err){
                    console.log(err.responseText);
                }
                    
                    

                
            })
        })
    }
}







class posts{
    constructor(){

        this.postcontainer=$('#post-list-container')
        this.createPost();
        let self=this;
        $(' .delete-post-button', this.postcontainer).each(function(){
            self.deletepost($(this));
            
        })
        $('#post-list-container>ul>li').each(function(){
            let postid=$(this).prop('id').split("-")[1];
            new comments(postid);
        })


    }

    createPost(){
        let newPostForm = $('#new-post-form');
        let self=this;

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/user/addpost',
                data: newPostForm.serialize(),
                success: function(data){
                  // console.log(data);
                   let newpost=self.newpostdom(data.data.post,data.data.user);
                   $('#post-list-container>ul').prepend(newpost);
                //    let lol=$(' .delete-post-button', newpost);
                //    console.log(lol);
                   self.deletepost($(' a', newpost));
                   console.log(data.data.post._id);
                   new comments(data.data.post._id);
                   
                 // console.log(newpost);
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
        
    }

    newpostdom=function(post,user){
        //console.log(user);
        return $(`<li id="post-${post._id}">
                    <a class="delete-post-button" href="/user/postdelete/${post._id}">X</a>
                    Post by : &nbsp ${user}
                    <h4>${post.content} </h4>
                    <form action="/user/addcomment" method="POST" id="new-comment-${post._id}">
                        <input type="text" name="comment" placeholder="Your comment goes here"> 
                        <input type="hidden" name="post" value="${post._id}" >
                        <button type="submit">Add Comment</button>
                    </form>
                    <div id="comment-div">
                        <ul id="post-comments-${post._id}">
                        
                        
                            <br>
                            <h1 id="barrier">---------------------------------------------</h1>
                            <br>
                            <br>
                        </ul>
                    </div>
                </li>
                `)
                
    }

    deletepost(deleteLink){
        //let self=this;
        //console.log(deleteLink);
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });





    }
}
new posts();
