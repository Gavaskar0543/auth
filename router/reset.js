const express = require('express');
const router = express.Router();
const resetController = require('../controller/user');
router.get('/password',resetController.showResetPage);
module.exports = router;