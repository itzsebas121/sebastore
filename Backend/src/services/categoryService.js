const { poolPromise } = require('../db');

module.exports = {
  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().execute('GetCategories');
    return result.recordset;
  },
};
