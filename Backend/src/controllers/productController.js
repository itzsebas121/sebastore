const productService = require('../services/productService');

module.exports = {
  async getAll(req, res) {
    const products = await productService.getAll();
    res.json(products);
  },
};
