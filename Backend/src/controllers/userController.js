const userService = require('../services/userService');

module.exports = {
  async getAll(req, res) {
    const users = await userService.getAll();
    res.json(users);
  },
  // Otros métodos CRUD
};
