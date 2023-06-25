const { Pokemon, Type } = require("../db");
const axios = require("axios");

const getAll = async () => {
    const pokemonsDb = await getAllDb();
    const pokemonsApi = await getAllApi();
    const all = [...pokemonsDb, ...pokemonsApi];
    return all;
}

const getAllDb = async () => {
    // const pokemonDb = await Pokemon.findAll({include: Type});
    // return pokemonDb
    const dataDB = await Pokemon.findAll({ include: Type });

    const dataBasePokemons = dataDB?.map((element) => {
      const types = element.dataValues.types.map((type) => type.name).join(" ");
  
      return {
        id: element.dataValues.id,
        name: element.dataValues.name,
        life: element.dataValues.life,
        attack: element.dataValues.attack,
        defense: element.dataValues.defense,
        speed: element.dataValues.speed,
        height: element.dataValues.height,
        weight: element.dataValues.weight,
        image: element.dataValues.image,
        types,
        createdInDb: true,
      };
    });
    return dataBasePokemons;
}

const getAllApi = async () => {
    const api = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=60");
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
            types: types.map(t => t.type.name).join(" "),
            createdInDb: false
        }
        return pok;
    })
    return pokeData;
}

const getName = async (name) => {
  const dataBasePokemons = await Pokemon.findAll({
    where: {
          name
        },
        include: Type
      });
    
      const db = dataBasePokemons?.map((element) => {
        const types = element.dataValues.types.map((type) => type.name).join(" ");
    
        return {
          id: element.dataValues.id,
          name: element.dataValues.name,
          life: element.dataValues.life,
          attack: element.dataValues.attack,
          defense: element.dataValues.defense,
          speed: element.dataValues.speed,
          height: element.dataValues.height,
          weight: element.dataValues.weight,
          image: element.dataValues.image,
          types,
          createdInDb: true,
        };
      });
      
      
      const apiPokemon = await getAllApi();
      
      const filterPokemon = await apiPokemon.filter((element) =>
      element.name.toLowerCase().includes(name.toLowerCase())
      );
      
      return [...db, ...filterPokemon];
    }
      // const dbName = await Pokemon.findAll({ where: {name} });
      
      // const getPokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      // const {forms, sprites, types} = getPokemons.data;
      // const pok = [{
      //     name: forms[0].name,
      //     image: sprites.other.dream_world.front_default,
      //     types: types.map(t => t.type.name)
      // }]
          
      
      // const all = dbName.concat(pok);
      // return all



// const allNames = dbName.concat(pok);
const getDbId = async (id) => {
    
      const pokemon = await Pokemon.findByPk(id, { include: Type });
      const {name, life, attack, defense, height, weight, speed, image, types} = pokemon.dataValues;
      let formattedTypes;
      if (Array.isArray(types) && types.length > 1) {
        formattedTypes = types.map(type => type.name).join(" ");
      } else if (Array.isArray(types) && types.length === 1) {
        formattedTypes = [types[0].name];
      } else {
        formattedTypes = [];
      }
      return {
          id,
          name,
          life,
          attack,
          defense,
          weight,
          height,
          speed,
          image,
          types: formattedTypes,
          
        }
}

const getApiId = async (id) => {
    const api = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const {forms, sprites, height, weight, types, stats} = api.data;
    const pok = {
        id: id,
        name: forms[0].name,
        height: height,
        weight: weight,
        speed: stats[5].base_stat,
        life: stats[0].base_stat,
        attack: stats[1].base_stat,
        defense: stats[2].base_stat,
        image: sprites.other.dream_world.front_default,
        types: types.map(t => t.type.name).join(" ")
    }
    return pok;

}


const pokemonUpdate = async (id, name, image, speed, height, weight, attack, defense, life, types) => {

  const pokemon = await Pokemon.findOne(id);
    // pokemon.name = name || pokemon.name;
    pokemon.image = image || pokemon.image;
    pokemon.speed = speed || pokemon.speed;
    pokemon.height = height || pokemon.height;
    pokemon.weight = weight || pokemon.weight;
    pokemon.attack = attack || pokemon.attack;
    pokemon.defense = defense || pokemon.defense;
    pokemon.life = life || pokemon.life;
    pokemon.types = types || pokemon.types

  await pokemon.setTypes(types);

  await pokemon.save();

  return pokemon;
}

module.exports = {
    getAll,
    getName,
    getDbId,
    getApiId,
    pokemonUpdate
}