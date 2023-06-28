const mongoose = require('mongoose');
const env = require('./environment');
mongoose.connect(`mongodb://localhost/${env.db}`);
const db = mongoose.connection;
db.on('error',console.error.bind(console,"Error in Connecting DataBase"));
db.once('open',function(){
    console.log('MongoDB connected:: Successfully!');

})
module.exports = db;