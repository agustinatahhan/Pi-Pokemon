const { Router } = require("express");
const { getTypes } = require("../handlers/typeHandlers");

const typeRouter = Router();

typeRouter.get("/", (req, res) => {
  getTypes(req, res);
});

module.exports = typeRouter;
