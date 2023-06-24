const express = require('express');
const router = express.Router();

const userController = require('../controller/user');

router.get('/',userController.home)
//if user
router.get('/signup',userController.newhomie);

//user
router.use('/user',require('./user'));
module.exports =  router;