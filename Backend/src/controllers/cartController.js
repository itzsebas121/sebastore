const cartService = require('../services/cartService');

module.exports = {

  async getCartByCustomerId(req, res) {
    const { CustomerId } = req.params;
    const result = await cartService.getCartByCustomerId(Number(CustomerId));
    if (result.error) return res.status(404).json(result);
    res.json(result);
  },

  async addProductToCart(req, res) {
    const result = await cartService.addProductToCart(req.body);
    if (result.error) return res.status(400).json(result);
    res.json(result);
  },

  async updateCartItem(req, res) {
    const result = await cartService.updateCartItem(req.body);
    if (result.error) return res.status(400).json(result);
    res.json(result);
  },

  async removeProductFromCart(req, res) {
    const result = await cartService.removeProductFromCart(req.body);
    if (result.error) return res.status(400).json(result);
    res.json(result);
  },
};
