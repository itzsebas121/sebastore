const express = require("express");
const router = express.Router();
const { poolPromise } = require("../db/sql");

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const pool = await poolPromise;

    // Total de productos
    const totalResult = await pool.request().query(`SELECT COUNT(*) AS total FROM Vista_ProductosConCategoria`);
    const total = totalResult.recordset[0].total;

    // Productos paginados usando ROW_NUMBER
    const result = await pool.request().query(`
      SELECT * FROM (
        SELECT *, ROW_NUMBER() OVER (ORDER BY ProductoId) AS RowNum
        FROM Vista_ProductosConCategoria
      ) AS Paginados
      WHERE RowNum BETWEEN ${offset + 1} AND ${offset + pageSize}
    `);

    res.status(200).json({
      data: result.recordset,
      currentPage: page,
      pageSize: pageSize,
      totalItems: total,
      totalPages: Math.ceil(total / pageSize),
    });

  } catch (err) {
    console.error("❌ Error al consultar productos:", err);
    res.status(500).send("Error interno del servidor");
  }
});

module.exports = router;
