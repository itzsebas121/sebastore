const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const productosRouter = require("./routes/productos");
const categoriasRouter = require("./routes/categorias");;
app.use("/api/productos", productosRouter);
app.use("/api/categorias", categoriasRouter);

app.listen(port, () => {
  console.log(`🚀 Server ready on http://localhost:${port}`);
});
