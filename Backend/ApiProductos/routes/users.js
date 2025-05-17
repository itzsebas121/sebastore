const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { poolPromise } = require("../db/sql");
require("dotenv").config();

router.post("/", async (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ error: "Faltan datos: correo y contrasena" });
  }

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("Correo", correo)
      .input("Contrasena", contrasena)
      .execute("ValidarLogin"); 

    if (result.recordset.length === 0) {
      return res.status(401).json({ error: "Correo o contraseña incorrectos." });
    }

    const user = result.recordset[0];

    const payload = {
      id: user.UsuarioId,
      nombre: user.Nombre,
      apellido: user.Apellido,
      tipoUsuario: user.TipoUsuario,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      token: token
    });

  } catch (error) {
    console.error("❌ Error en el login:", error);
    res.status(500).json({ error: "Error interno del servidor", message: error.message });
  }
});

module.exports = router;
