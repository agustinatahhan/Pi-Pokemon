const { Pokemon } = require("../db");
const axios = require("axios");

const getAll = async () => {
    const pokemonsDb = await getAllDb();
    const pokemonsApi = await getAllApi();
    const all = [...pokemonsDb, ...pokemonsApi];
    return all;
}

const getAllDb = async () => {
    const pokemonDb = await Pokemon.findAll();
    return pokemonDb
}

const getAllApi = async () => {
    const api = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=25");
    const data = api.data.results;
    const dataMap = data.map(dat => dat.url);
    const responses = await Promise.all(dataMap.map(url => axios.get(url)))
    const pokeData = responses.map(response => {
        const {id, forms, height, weight, stats, sprites, types} = response.data;
        const pok = {
            id,
            name: forms[0].name,
            height,
            weight,
            speed: stats[5].base_stat,
            life: stats[0].base_stat,
            attack: stats[1].base_stat,
            defense: stats[2].base_stat,
            image: sprites.other.dream_world.front_default,
            types: types.map(t => t.type.name)
        }
        return pok;
    })
    return pokeData;
}

const getName = async (name) => {
    
    const dbName = await Pokemon.findAll( { where: { name: name.toLowerCase() } });
    
    
    const getPokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    const {forms, sprites} = getPokemons.data;
    const pok = {
        name: forms[0].name,
        image: sprites.other.home.front_default
    }
    
    const allNames = dbName.concat(pok);
    return allNames;
    
}

const getDbId = async (id) => {
    const db = await Pokemon.findByPk(id);
    return db;
}

const getApiId = async (id) => {
    const api = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const {forms, sprites} = api.data;
    const pok = {
        name: forms[0].name,
        image: sprites.other.home.front_default
    }
    return pok;

}

module.exports = {
    getAll,
    getName,
    getDbId,
    getApiId
}