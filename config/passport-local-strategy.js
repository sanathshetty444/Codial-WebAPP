const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/codial');

//authntication using passport
passport.use(new LocalStrategy({
    usernameField:'email'
},
function(email,password,done){
    //finad a user and establish identity
    User.findOne({email:email},function(err,user){
        if(err){
            console.log('error in passport');
            return done(err);
        }
        if(!user || user.password!=password)
        {
            console.log('invalid username password');
            return done(null,false);
        }
        return done(null,user); 
    })
}
));

//inserting in the cookie
//serialising the user to decide which key is kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});


//deserializing ie getting from the cookeie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in passport');
            return done(err);
        }
        return done(null,user);
    })
});

passport.checkAuthenticaton=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/user/signin');
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user; 
        // console.log(req.user);
    }
    next();
}


module.exports=passport;
