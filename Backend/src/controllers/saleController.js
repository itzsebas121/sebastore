const saleService = require('../services/saleService');

module.exports = {
  async getAll(req, res) {
    const sales = await saleService.getAll();
    res.json(sales);
  },
};
