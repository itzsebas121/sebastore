const { poolPromise } = require('../db');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

module.exports = {
    async createCustomer({ Email, Password, FirstName, LastName, Phone }) {
        const pool = await poolPromise;
        const request = pool.request();

        request.input('Email', Email);
        request.input('Password', Password);
        request.input('FirstName', FirstName);
        request.input('LastName', LastName);
        request.input('Phone', Phone);

        const result = await request.execute('CreateCustomer');

        // Resultado puede ser error o mensaje exitoso
        const record = result.recordset[0];

        if (record.error) {
            throw new Error(record.error);
        }

        return record; // { message: 'Customer successfully created', CustomerId: n }
    },
    async loginUser({ Email, Password }) {
        const pool = await poolPromise;
        const request = pool.request();

        request.input('Email', Email);
        request.input('Password', Password);

        const result = await request.execute('LoginUser');

        const record = result.recordset[0];
        if (record?.error) {
            throw new Error(record.error);
        }

        const payload = {
            userId: record.UserId,
            role: record.Role,
            ...(record.AdminId ? { adminId: record.AdminId } : {}),
            ...(record.CustomerId ? { customerId: record.CustomerId } : {})
        };

        const token = jwt.sign(payload, SECRET_KEY, {
            expiresIn: '180h'
        });


        return {
            token,
        };
    }
};
