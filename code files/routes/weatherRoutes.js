const r = require("express").Router();
const { currentWeather } = require("../controllers/weatherController");

r.get("/:city", currentWeather); // public endpoint, no account required
module.exports = r;
