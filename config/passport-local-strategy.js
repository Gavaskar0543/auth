const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
passport.use(new LocalStrategy({
    usernameField : 'email',
    passReqToCallback:true
},
function(req,email,password,done){
User.findOne({email : email},function(err,user){
    if(err){
        return done(err);
    }
    if(!user || user.password != password){
        return done(null,false);
    }
    return done(null, true);
})
}
))