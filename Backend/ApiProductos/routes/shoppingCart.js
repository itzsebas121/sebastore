const express = require("express");
const router = express.Router();
const { poolPromise } = require("../db/sql");

router.post("/add", async (req, res) => {
  const { ClienteId, ProductoId, Cantidad } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input("ClienteId", ClienteId)
      .input("ProductoId", ProductoId)
      .input("Cantidad", Cantidad)
      .execute("AgregarAlCarrito");

    res.status(200).json({ message: "Producto agregado al carrito" });
  } catch (err) {
    console.error("❌ Error al agregar al carrito:", err);
    res.status(500).send({message:"Error al agregar al carrito"});
  }
});

router.get("/view/:clienteId", async (req, res) => {
  const { clienteId } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("ClienteId", clienteId)
      .execute("VerCarritoActivo");

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error("❌ Error al ver el carrito:", err);
    res.status(500).send("Error al obtener el carrito");
  }
});

router.put("/update", async (req, res) => {
  const { CartId, ProductoId, NuevaCantidad } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input("CartId", CartId)
      .input("ProductoId", ProductoId)
      .input("NuevaCantidad", NuevaCantidad)
      .execute("ActualizarCantidadCarrito");

    res.status(200).json({ message: "Cantidad actualizada correctamente" });
  } catch (err) {
    console.error("❌ Error al actualizar cantidad:", err);
    res.status(500).send("Error al actualizar cantidad del carrito");
  }
});

module.exports = router;
