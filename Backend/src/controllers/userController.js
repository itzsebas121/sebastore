const userService = require('../services/userService');

module.exports = {
    async createCustomer(req, res) {
        try {
            const data = await userService.createCustomer(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async loginUser(req, res) {
        try {
            const data = await userService.loginUser(req.body);
            res.json(data); 
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    },
};
