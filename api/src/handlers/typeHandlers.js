const {getPokeTypes} = require("../controllers/typesControllers");

const getTypes = async (req, res) => {
    try {
        const response = await getPokeTypes();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
    
}

module.exports = {getTypes};