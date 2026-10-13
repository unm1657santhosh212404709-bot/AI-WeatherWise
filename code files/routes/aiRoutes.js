const r = require("express").Router();
const c = require("../controllers/weatherController");
const { protect } = require("../middleware/auth");

r.get("/summary/:city", protect, c.aiSummary);
r.get("/recommendations/:city", protect, c.aiRecommendations);
module.exports = r;
