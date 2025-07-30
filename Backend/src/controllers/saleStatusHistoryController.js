const saleStatusHistoryService = require('../services/saleStatusHistoryService');

module.exports = {
  async getAll(req, res) {
    const history = await saleStatusHistoryService.getAll();
    res.json(history);
  },
};
