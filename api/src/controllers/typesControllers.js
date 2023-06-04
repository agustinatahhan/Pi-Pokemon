const axios = require("axios");
const { Types } = require("../db");

const getPokeTypes = async () => {
    
    let pokeArray = [];
    await axios.get("https://pokeapi.co/api/v2/type")
      .then((pokeTypes) =>
        pokeTypes.data.results.map(type => pokeArray.push({ name: type.name }))
      );
    const pokeTypes = await Types.findAll();
    if (pokeTypes.length === 0) {
      await Types.bulkCreate(pokeArray);
    }
    return pokeArray;
}

module.exports = {getPokeTypes};