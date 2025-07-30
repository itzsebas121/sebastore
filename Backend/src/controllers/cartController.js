const cartService = require('../services/cartService');

module.exports = {
  async getAll(req, res) {
    const carts = await cartService.getAll();
    res.json(carts);
  },
};
