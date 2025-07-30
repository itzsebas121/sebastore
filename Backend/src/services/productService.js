const { poolPromise } = require('../db');

module.exports = {
    async getAll({ NameFilter = null, CategoryId = null, MinPrice = null, MaxPrice = null, PageNumber = 1, PageSize = 20 }) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('NameFilter', NameFilter)
            .input('CategoryId', CategoryId)
            .input('MinPrice', MinPrice)
            .input('MaxPrice', MaxPrice)
            .input('PageNumber', PageNumber)
            .input('PageSize', PageSize)
            .execute('GetProducts');

        const totalCount = result.recordsets[0][0]?.TotalCount || 0;
        const products = result.recordsets[1];

        return { totalCount, products };
    },
};
