const r = require("express").Router();
const c = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/auth");

r.use(protect, authorize("admin"));
r.get("/users", c.listUsers);
r.get("/stats", c.stats);
r.put("/users/:id/suspend", c.setSuspended);
r.delete("/users/:id", c.deleteUser);
module.exports = r;
