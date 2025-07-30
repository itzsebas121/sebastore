const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAll);
// Otros endpoints CRUD

module.exports = router;
