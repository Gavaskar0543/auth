const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/auth');
const db = mongoose.connection;
db.on('error',console.error.bind(console,"Error in Connecting DataBase"));
db.once('open',function(){
    console.log('MongoDB connected:: Successfully!');

})
module.exports = db;