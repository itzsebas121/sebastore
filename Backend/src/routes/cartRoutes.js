const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/by-customer/:CustomerId', cartController.getCartByCustomerId);
router.post('/add-product', cartController.addProductToCart);
router.put('/update-item', cartController.updateCartItem);
router.delete('/remove-product', cartController.removeProductFromCart);

module.exports = router;
