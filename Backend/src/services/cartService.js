const { poolPromise } = require('../db');

module.exports = {
  async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Carts');
    return result.recordset;
  },

  async getCartByCustomerId(CustomerId) {
    if (!CustomerId) {
      return { error: 'CustomerId es requerido.' };
    }

    const pool = await poolPromise;
    const result = await pool.request()
      .input('CustomerId', CustomerId)
      .execute('GetCartByCustomerId');

    const recordset = result.recordset;

    if (recordset.length === 1 && recordset[0].error) {
      return { error: recordset[0].error };
    }

    return { products: recordset };
  },
  async addProductToCart({ CustomerId, ProductId, Quantity }) {
    if (!CustomerId || !ProductId || !Quantity || Quantity <= 0) {
      return { error: 'Parámetros inválidos o cantidad debe ser mayor a cero.' };
    }
    const pool = await poolPromise;
    const result = await pool.request()
      .input('CustomerId', CustomerId)
      .input('ProductId', ProductId)
      .input('Quantity', Quantity)
      .execute('AddProductToCart');
    return result.recordset[0] || {};
  },

  async updateCartItem({ CustomerId, ProductId, Quantity }) {
    if (!CustomerId || !ProductId || !Quantity || Quantity <= 0) {
      return { error: 'Parámetros inválidos o cantidad debe ser mayor a cero.' };
    }
    const pool = await poolPromise;
    const result = await pool.request()
      .input('CustomerId', CustomerId)
      .input('ProductId', ProductId)
      .input('Quantity', Quantity)
      .execute('UpdateCartItem');
    return result.recordset[0] || {};
  },

  async removeProductFromCart({ CustomerId, ProductId }) {
    if (!CustomerId || !ProductId) {
      return { error: 'Parámetros inválidos.' };
    }
    const pool = await poolPromise;
    const result = await pool.request()
      .input('CustomerId', CustomerId)
      .input('ProductId', ProductId)
      .execute('RemoveProductFromCart');
    return result.recordset[0] || {};
  },
};
