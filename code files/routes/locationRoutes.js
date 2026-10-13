const r = require("express").Router();
const c = require("../controllers/locationController");
const { protect } = require("../middleware/auth");

r.use(protect);
r.route("/").post(c.addLocation).get(c.getLocations);
r.route("/:id").put(c.updateLocation).delete(c.deleteLocation);
module.exports = r;
