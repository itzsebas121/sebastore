const customerService = require('../services/customerService');

module.exports = {
  async getAll(req, res) {
    const customers = await customerService.getAll();
    res.json(customers);
  },
};
