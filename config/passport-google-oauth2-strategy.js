const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/UserModel');
const loginAlert = require('../mailer/loginMails');
const queue = require('./kue');
const loginworker = require('../worker/loginworker');
const env = require('./environment');
passport.use(new googleStrategy({
    clientID: env.clientID,
    clientSecret: env.clientSecret,
    callbackURL: env.callbackURL,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Find user
        let user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
            let job = queue.create('logs',user).save(function(err){
                if(err){
                    console.log('error in entering in queue',err);
                    return;
                }
                console.log('email added to the queue',job.id);
               })
            return done(null, user);
        } else {
            // Create new user
            user = await User.create({
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            });
           
            return done(null, user);
        }
    } catch (err) {
        console.log('Error in Google strategy:', err);
        return done(err);
    }
}));


module.exports = passport;