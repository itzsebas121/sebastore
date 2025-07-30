const express = require('express');
const router = express.Router();
const cartItemController = require('../controllers/cartItemController');

router.get('/', cartItemController.getAll);

module.exports = router;
