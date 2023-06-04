const axios = require("axios");
const {getAll, getName, getDbId, getApiId, createPok} = require("../controllers/pokemonControllers");
const { Pokemon, Types } = require("../db");

const getAllPokemons = async (req, res) => {
    const { name } = req.query;
    try {
        
        const findName = name ? await getName(name) : await getAll();
        return res.status(200).json(findName);
        
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
  
}

const getPokemonId = async (req, res) => {
    const { id } = req.params;
    try {
        const response = isNaN(id) ? await getDbId(id) : await getApiId(id);
            
        return res.status(200).json(response);
        
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

const createPokemon = async (req, res) => {
    const {id, name, life, speed, attack, defense, type, weight, height, image} = req.body;
    try {
        const newPokemon = await Pokemon.create({
            id,
            name,
            life,
            speed,
            attack,
            defense,
            weight,
            height,
            image
        })
    
        let typesDB = await Types.findAll({where : {name: type}});
       
        await newPokemon.addTypes(typesDB);
        
        return res.status(200).json("Pokemon creado");

    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    getAllPokemons,
    getPokemonId,
    createPokemon,
}