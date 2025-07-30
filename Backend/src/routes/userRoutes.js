const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.createCustomer);
router.post('/login', userController.loginUser);
module.exports = router;
