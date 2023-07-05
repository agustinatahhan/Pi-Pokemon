const { Router } = require("express");
const pokemonRouter = require("./pokemon");
const typeRouter = require("./type");
const userRouter = require("./user");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemon", pokemonRouter);
router.use("/type", typeRouter);
router.use("/user", userRouter)

module.exports = router;
