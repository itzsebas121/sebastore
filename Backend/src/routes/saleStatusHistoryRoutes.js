const express = require('express');
const router = express.Router();
const saleStatusHistoryController = require('../controllers/saleStatusHistoryController');

router.get('/', saleStatusHistoryController.getAll);

module.exports = router;
