const express = require('express');
const router = express.Router()
const authController = require('../controllers/authController')

//GET /auth/login
router.get('/login', authController.login);

//GET /auth/register
router.post('/register', authController.register);


module.exports = router;