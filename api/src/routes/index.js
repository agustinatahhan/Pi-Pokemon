const { Router } = require("express");
const pokemonRouter = require("./pokemon");
const typeRouter = require("./type");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemon", pokemonRouter);
router.use("/type", typeRouter);

module.exports = router;
