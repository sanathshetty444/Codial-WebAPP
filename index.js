const express=require('express');
const app=express();
const port = 8000;
const path=require('path');
const expresslayouts=require('express-ejs-layouts');
const mongoose=require('mongoose');
const db=require('./config/mongoose');
const cookieParser=require('cookie-parser');




//used for session cookie and for authentication
const session = require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const sassMiddleware=require('node-sass-middleware');
const Mongostore=require('connect-mongo')(session);
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));


app.use(express.urlencoded({
    extended:true
}));

app.use(cookieParser());

app.use(express.static('./assets'));


app.use(expresslayouts);

app.set('layoutextractStyles',true);
app.set('layoutextractScripts',true);




app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.use(session({
    name:'codial', 
    secret:'lolllllllllllll',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)

    },
    store: new Mongostore({
        mongooseConnection: mongoose.connection,
        collection:'sessions',
        autoRemove:'disabled'
    },function(err){
        if(err)
            console.log(err);
    })

}));


app.use(passport.initialize());
app.use(passport.session());
app. use(passport.setAuthenticatedUser);


app.use('/',require('./routes'));













app.listen(port,function(err){
   if(err){
    console.log('error');
   }
   console.log('connected successfully');
});
//lol