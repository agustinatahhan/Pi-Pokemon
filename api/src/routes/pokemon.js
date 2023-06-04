const { Router } = require("express");
const {getAllPokemons, getPokemonId, createPokemon} = require("../handlers/pokemonHandlers");



const pokemonRouter = Router();

pokemonRouter.get("/", (req, res) => {
    getAllPokemons(req, res)
});
pokemonRouter.get("/:id", (req, res) => {
    getPokemonId(req, res)
})
pokemonRouter.post("/", (req, res) => {
    createPokemon(req, res)
})




module.exports = pokemonRouter;