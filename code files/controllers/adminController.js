const User = require("../models/User");
const Location = require("../models/Location");

exports.listUsers = async (req, res, next) => {
  try { res.json(await User.find().select("-password")); } catch (e) { next(e); }
};

exports.setSuspended = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { suspended: !!req.body.suspended }, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (e) { next(e); }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await Location.deleteMany({ user: user._id });
    res.json({ message: "User and their locations deleted" });
  } catch (e) { next(e); }
};

exports.stats = async (req, res, next) => {
  try { res.json({ users: await User.countDocuments(), locations: await Location.countDocuments() }); }
  catch (e) { next(e); }
};
