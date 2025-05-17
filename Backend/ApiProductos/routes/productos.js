const express = require("express");
const router = express.Router();
const { poolPromise } = require("../db/sql");

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const categoria = req.query.categoria;
    const search = req.query.search;

    const pool = await poolPromise;

    let baseQuery = "FROM Vista_ProductosConCategoria WHERE 1=1";

    if (categoria && categoria !== "Todas") {
      baseQuery += ` AND CategoriaNombre = @categoria`;
    }

    if (search) {
      baseQuery += ` AND ProductoNombre LIKE '%' + @search + '%'`;
    }

    const totalResult = await pool.request()
      .input("categoria", categoria || "")
      .input("search", search || "")
      .query(`SELECT COUNT(*) AS total ${baseQuery}`);

    const total = totalResult.recordset[0].total;

    const productsResult = await pool.request()
      .input("categoria", categoria || "")
      .input("search", search || "")
      .query(`
        SELECT * FROM (
          SELECT *,
          ROW_NUMBER() OVER (ORDER BY ProductoId) AS RowNum
          ${baseQuery}
        ) AS Paginados
        WHERE RowNum BETWEEN ${offset + 1} AND ${offset + pageSize}
      `);

    res.status(200).json({
      data: productsResult.recordset,
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
