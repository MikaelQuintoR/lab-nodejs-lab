// app.js
const express = require('express');
const db = require('./db');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/usuarios', (req, res) => {
  db.all("SELECT * FROM usuarios", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.post('/usuarios', (req, res) => {
  const { nombre, correo } = req.body;
  db.run("INSERT INTO usuarios (nombre, correo) VALUES (?, ?)", [nombre, correo], function(err) {
    if (err) return res.status(500).json(err);
    res.json({ id: this.lastID });
  });
});

app.put('/usuarios/:id', (req, res) => {
  const { nombre, correo } = req.body;
  db.run("UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?", [nombre, correo, req.params.id], function(err) {
    if (err) return res.status(500).json(err);
    res.json({ cambios: this.changes });
  });
});

app.delete('/usuarios/:id', (req, res) => {
  db.run("DELETE FROM usuarios WHERE id = ?", req.params.id, function(err) {
    if (err) return res.status(500).json(err);
    res.json({ cambios: this.changes });
  });
});

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
