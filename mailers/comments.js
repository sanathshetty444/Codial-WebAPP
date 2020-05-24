const nodemailer=require('../config/nodemailer');
exports.newComment=(comment)=>{
    console.log(comment.user.email);
    nodemailer.transporter.sendMail({
        from:'sanath@codial.in',
        to:comment.user.email,
        subject:"new comment published",
        html:'<h1> YUP,your comment is published'
    },(err,info)=>{
        if(err){console.log("error in mailing",err);return;}
        
    
    console.log('message sent',info)
    return;
});
}
