const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const productosRouter = require("./routes/productos");
const categoriasRouter = require("./routes/categorias");
const loginRouter = require("./routes/users");
const shoppingCartRouter = require("./routes/shoppingCart");
app.use("/api/productos", productosRouter);
app.use("/api/categorias", categoriasRouter);
app.use("/api/login", loginRouter);
app.use("/api/cart", shoppingCartRouter);

app.listen(port, () => {
  console.log(`🚀 Server ready on http://localhost:${port}`);
});
