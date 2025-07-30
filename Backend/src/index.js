const express = require('express');
const app = express();
app.use(express.json());
app.use('/users', require('./routes/userRoutes'));
app.use('/customers', require('./routes/customerRoutes'));
app.use('/admins', require('./routes/adminRoutes'));
app.use('/categories', require('./routes/categoryRoutes'));
app.use('/products', require('./routes/productRoutes'));
app.use('/sales', require('./routes/saleRoutes'));
app.use('/carts', require('./routes/cartRoutes'));
app.use('/cart-items', require('./routes/cartItemRoutes'));
app.use('/sale-status-history', require('./routes/saleStatusHistoryRoutes'));
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
