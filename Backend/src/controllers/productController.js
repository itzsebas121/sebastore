const productService = require('../services/productService');

module.exports = {
  getAll: async (req, res) => {
    try {
      const filters = req.query;
      const data = await productService.getAll(filters);
      res.json(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}