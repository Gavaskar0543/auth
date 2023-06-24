const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/UserModel');

//authenication using passport

// Authentication using Passport
passport.use(new localStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
async function(req, email, password, done) {
    try {
        // Find a user and establish the identity
        const user = await User.findOne({ email: email }).exec();
        
        if (!user || user.password !== password) {
            console.log('error', 'Invalid Username/Password');
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
       console.log('error', err.message);
        return done(err);
    }
}));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    console.log('serialized successfully');
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.findById(id).exec();
      if (!user) {
        console.log('User not found');
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      console.log('Error in finding user --> Passport');
      return done(err);
    }
  });
  

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}



module.exports = passport;