const express = require("express");
const router = express.Router();
const { poolPromise } = require("../db/sql");

router.get("/ventaid/:ventaId", async (req, res) => {
  const { ventaId } = req.params;

  if (!ventaId) {
    return res.status(400).json({ error: "Falta el parámetro ventaId" });
  }

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("VentaId", ventaId)
      .execute("ObtenerDetalleVentaPorId");


    return res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error("❌ Error al obtener detalle de venta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/clienteid/:clienteId", async (req, res) => {
  const { clienteId } = req.params;

  if (!clienteId) {
    return res.status(400).json({ error: "Falta el parámetro clienteId" });
  }

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("ClienteId", clienteId)
      .execute("ObtenerHistorialVentasPorCliente");

    return res.status(200).json(result.recordset);
  } catch (error) {
    console.error("❌ Error al obtener historial:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;

