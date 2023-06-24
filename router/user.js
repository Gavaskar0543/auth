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

//destroy session
router.get('/sign-out',userController.destroySession);
module.exports = router;