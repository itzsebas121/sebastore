const cartItemService = require('../services/cartItemService');

module.exports = {
  async getAll(req, res) {
    const cartItems = await cartItemService.getAll();
    res.json(cartItems);
  },
};
