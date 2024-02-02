const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/login', userController.login);

router.post('/register', userController.register);

router.post('/logout', auth, userController.logout);

module.exports = router;
