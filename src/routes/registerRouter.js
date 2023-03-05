const express = require('express');
const router = express.Router();
const registerController = require('../controller/registerController');
router.get('/register', registerController.showPage);
router.post('/register', registerController.register);
module.exports = router;
