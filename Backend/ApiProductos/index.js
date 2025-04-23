const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Usar rutas
const productosRouter = require("./routes/productos");
app.use("/api/productos", productosRouter);

app.listen(port, () => {
  console.log(`🚀 Server ready on http://localhost:${port}`);
});
