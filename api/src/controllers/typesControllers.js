const axios = require("axios");
const { Type } = require("../db");

const getPokeTypes = async () => {
    
    let pokeArray = [];
    await axios.get("https://pokeapi.co/api/v2/type")
      .then((pokeTypes) =>
        pokeTypes.data.results.map(type => pokeArray.push({ name: type.name}))
      );
    const pokeTypes = await Type.findAll();
    if (pokeTypes.length === 0) {
      await Type.bulkCreate(pokeArray);
    }
    return pokeArray;
}

module.exports = {getPokeTypes};