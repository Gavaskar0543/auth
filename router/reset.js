const express = require('express');
const router = express.Router();
const resetController = require('../controller/user');
router.get('/password/',resetController.showResetPage);
router.post('/update',resetController.setpassword);
module.exports = router;