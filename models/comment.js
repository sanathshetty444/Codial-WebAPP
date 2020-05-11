const mongoose=require('mongoose');
const comment=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Posts'
    }
},{
    timestamps:true
});
const Comment=mongoose.model('Comment',comment); 
module.exports=Comment; 