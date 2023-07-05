const { User } = require("../db");

const createUser = async (req, res) => {
  const { id, email, password } = req.body;

  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        id,
        email,
        password,
      },
    });

    if (!created) {
      return res.status(409).json({ error: "User already exists" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password, try again" });
    }

    return res.status(200).json({ message: "Login successful", homeURL: "/home" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createUser,
  loginUser,
};
