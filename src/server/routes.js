const express = require("express");
const router = express.Router();
const connection = require("./db");

// Registro
router.post("/registros", (req, res) => {
  const { nombre, correo, contraseña, id_rol } = req.body;
  connection.query("INSERT INTO tb_usuarios SET ?", { nombre, correo, contraseña, id_rol }, (err, results) => {
    if (err) return res.status(500).json({ error: "Error al registrar" });
    res.status(201).json({ message: "Registro exitoso" });
  });
});

// Login
router.post("/login", (req, res) => {
  const { correo, contraseña } = req.body;
  connection.query("SELECT * FROM tb_usuarios WHERE correo = ? AND contraseña = ?", [correo, contraseña], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la autenticación" });
    if (results.length === 0) return res.status(401).json({ error: "Credenciales incorrectas" });

    res.json({ id_usuario: results[0].id_usuario, id_rol: results[0].id_rol });
  });
});

module.exports = router;
