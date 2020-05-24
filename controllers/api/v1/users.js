const JsonWebToken=require('jsonwebtoken');
const User=require('../../../models/codial');
module.exports.signin=async function(req,res){
    try {
        let user= await User.findOne({email:req.body.email});
        if(!user || user.password!=req.body.password){
            return res.status(422).json({
                message:"Invalid Username or password"
            })
            
        }
        // console.log(user.name);
        return res.status(200).json({
            data:{
                token:JsonWebToken.sign(user.toJSON(),'codial',{expiresIn:100000})
            }
        })
        
    } catch (error) {
        console.log("error in signin",error);
        return res.status(500).json({
            message:"Internal servor error"
        })
    }
    
}