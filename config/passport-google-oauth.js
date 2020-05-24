const passport=require('passport');
const googlestrtegy=require('passport-google-oauth').OAuth2Strategy;
const User=require('../models/codial');
const crypto=require('crypto');

//new strategt to use by passport
passport.use(new googlestrtegy({

    clientID:"904682235148-uk0qamushu9decqpo17sr08fki50v3mu.apps.googleusercontent.com",
    clientSecret:"RnW5w2SrWd8uzwW5TYJjNJCx",
    callbackURL:"http://localhost:8000/user/auth/google/callback"

},
function(accessToken,refreshToken,profile,done){
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){return console.log("error in google-oauth",err)};
        console.log(profile);
        if(user){
            done(null,user);

        }
        else{
            console.log(profile);
            User.create({
                email:profile.emails[0].value,
                name:profile.displayName,
                password:crypto.randomBytes(20).toString('hex')

            },function(err,user){
                if(err){return console.log("error in creating user",err)};
                return done(null,user);
            });

        }
    });
}));
module.exports=passport;
