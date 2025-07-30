const categoryService = require('../services/categoryService');

module.exports = {
  async getAll(req, res) {
    const categories = await categoryService.getAll();
    res.json(categories);
  },
};
