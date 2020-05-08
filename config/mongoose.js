const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/codial');
const db = mongoose.connection;
db.on('error',console.error.bind("Error on connecting"));
db.once('open',function(){
    
    console.log("Successfully connected to server mongodb")
});
