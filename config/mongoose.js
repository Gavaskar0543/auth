const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/auth');
const db = mongoose.connection;

db.on('error',console.error.bind(console,'error in connecting with mongodb'));
//once connected
db.once('open',function(){
    console.log('MongoDb::connected successfully');
})