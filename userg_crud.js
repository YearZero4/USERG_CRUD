const express = require('express');
const app = express();
const PORT = 3009;

app.use(express.json());
let usuarios = [];

for (let i = 1; i <= 3; i++) {
 const nal = Math.floor(100000 + Math.random() * 900000);
 usuarios.push({ id: nal, nombre: `usuario${i}` });
}

app.get('/usuarios', (req, res) => res.json(usuarios));
app.get('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id === +req.params.id);
    if (!usuario) return res.status(404).send('Usuario no encontrado');
    res.json(usuario);
});

app.post('/usuarios', (req, res) => {
const nuevoUsuario = {
 id: Math.floor(100000 + Math.random() * 900000),
 nombre: req.body.nombre
};
usuarios.push(nuevoUsuario);res.status(201).json(nuevoUsuario);
});

app.put('/usuarios/:id', (req, res) => {
const usuario = usuarios.find(u => u.id === +req.params.id);
if (!usuario) return res.status(404).send('Usuario no encontrado');
usuario.nombre = req.body.nombre;
res.json(usuario);
});

app.delete('/usuarios/:id', (req, res) => {
const usuarioIndex = usuarios.findIndex(u => u.id === +req.params.id);
if (usuarioIndex === -1) return res.status(404).send('Usuario no encontrado');
usuarios.splice(usuarioIndex, 1);
res.status(204).send();
});

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
