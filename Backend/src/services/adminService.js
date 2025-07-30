const { poolPromise } = require('../db');

module.exports = {
  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Admins');
    return result.recordset;
  },
};
