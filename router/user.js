const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/user');
router.get('/signup',usercontroller.signup);
router.get('/signin',usercontroller.signin);
router.post('/create',usercontroller.create);
router.post('/create-session',usercontroller.createSession);
router.get('/reset',usercontroller.reset);

module.exports = router;