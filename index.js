const express=require('express');
const app=express();
const port = 8000;
const path=require('path');
const expresslayouts=require('express-ejs-layouts');


app.use(expresslayouts);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use('/',require('./routes'));
app.use('/profile',require('./routes'));


app.set('layoutextractStyles',true);
app.set('layoutextractScripts',true);





app.listen(port,function(err){
   if(err){
    console.log('error');
   }
   console.log('connected successfully');
});
//lol