const axios = require("axios");
const {
  getAll,
  getName,
  getDbId,
  getApiId,
  pokemonUpdate,
} = require("../controllers/pokemonControllers");
const { Pokemon } = require("../db");

const getAllPokemons = async (req, res) => {
  const { name } = req.query;
  try {
    const findName = name ? await getName(name) : await getAll();
    return res.status(200).json(findName);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getPokemonId = async (req, res) => {
  const { id } = req.params;
  try {
    const response = isNaN(id) ? await getDbId(id) : await getApiId(id);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// const createPokemon = async (req, res) => {
//     const {id, name, life, speed, attack, defense, types, weight, height, image} = req.body;
//     try {
//         const pokem = await findOrCreate({where: {name}}, )
//     } catch (error) {

//     }
// try {
//     const newPokemon = await Pokemon.create({
//         id,
//         name,
//         life,
//         speed,
//         attack,
//         defense,
//         weight,
//         height,
//         image,
//         types
//     })

//     await newPokemon.addTypes(types);

//     return res.status(200).json("Pokemon creado");

// } catch (error) {
//     return res.status(400).json({error: error.message})
// }
// }
const createPokemon = async (req, res) => {
  const {
    id,
    name,
    life,
    speed,
    attack,
    defense,
    types,
    weight,
    height,
    image,
  } = req.body;
  try {
    const [pokemon, created] = await Pokemon.findOrCreate({
      where: { name },
      defaults: {
        id,
        life,
        speed,
        attack,
        defense,
        types,
        weight,
        height,
        image,
      },
    });

    if (!created) {
      return res.status(409).json({ error: "El nombre del Pokémon ya existe" });
    }

    await pokemon.addTypes(types);

    return res.status(200).json(pokemon);
  } catch (error) {
    return res.status(400).json({ error: "Error interno del servidor" });
  }
};

const deletePoke = async (req, res) => {
  const { id } = req.params;
  try {
    await Pokemon.destroy({
      where: {
        id: id,
      },
    });
    const allPokes = await getAll();

    return res.status(200).json(allPokes);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// const modifyPokemon = async (req, res) => {

//     const {id, name, image, speed, height, weight, attack, defense, life, types} = req.body;
//     try {
//         const modify = await pokemonUpdate(id, name, image, speed, height, weight, attack, defense, life, types);

//         if (modify.error) throw Error(modify.error);

//         return res.status(200).json("Pokemon updated");

//     } catch (error) {
//         return res.status(400).json({error: error.message})
//     }
// }
const UpdatePokemonHandler = async (req, res) => {
  const {
    id,
    name,
    image,
    speed,
    height,
    weight,
    attack,
    defense,
    life,
    types,
  } = req.body;
  try {
    const modify = await pokemonUpdate(
      id,
      name,
      image,
      speed,
      height,
      weight,
      attack,
      defense,
      life,
      types
    );

    if (modify.error) throw Error(modify.error);

    return res.status(200).json("Pokemon updated");
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error updating pokemon", message: error.message });
  }
};

module.exports = {
  getAllPokemons,
  getPokemonId,
  createPokemon,
  deletePoke,
  UpdatePokemonHandler,
};
