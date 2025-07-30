const adminService = require('../services/adminService');

module.exports = {
  async getAll(req, res) {
    const admins = await adminService.getAll();
    res.json(admins);
  },
};
