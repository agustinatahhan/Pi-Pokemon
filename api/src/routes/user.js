const { Router } = require("express");
const { createUser, loginUser } = require("../handlers/userHandlers");
const userRouter = Router();

userRouter.post("/register", (req, res) => {
  createUser(req, res);
});
userRouter.post("/login", (req, res) => loginUser(req, res));

module.exports = userRouter;
