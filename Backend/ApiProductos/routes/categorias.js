const express = require("express");
const router = express.Router();
const { poolPromise } = require("../db/sql");

router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().query(`SELECT * FROM Categorias`);

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error("❌ Error al consultar categorías:", err);
    res.status(500).send("Error interno del servidor");
  }
});

module.exports = router;
