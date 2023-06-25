const { getPokeTypes } = require("../controllers/typesControllers");
const { Type } = require("../db");

const getTypes = async (req, res) => {
  await getPokeTypes();
  try {
    const types = await Type.findAll();
    res.status(200).send(
      types.map((type) => {
        return {
          id: type.id,
          name: type.name,
        };
      })
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { getTypes };
