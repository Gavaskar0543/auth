const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controller/user');
//creating new 
router.post('/create',userController.createNewUser);
//use passport as middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/signup'},
), userController.createSession);

router.get('/auth/google', passport.authenticate(
    'google',
    {scope:['profile','email']}
));


router.get('/auth/google/callback', passport.authenticate(
    'google',
    {failureRedirect: '/signup'},
), userController.createSession);

//destroy session
router.get('/sign-out',userController.destroySession);

//reset password
router.get('/reset',userController.reset);
//to send mail to reset password
router.post('/passwordReset',userController.resetMyPassword);
//got link from email and now showing password update page
router.use('/reset',require('./reset'));
module.exports = router;