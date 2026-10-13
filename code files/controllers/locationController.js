const Location = require("../models/Location");

exports.addLocation = async (req, res, next) => {
  try {
    const { city, country } = req.body;
    res.status(201).json(await Location.create({ user: req.user._id, city, country }));
  } catch (e) { next(e); }
};

exports.getLocations = async (req, res, next) => {
  try { res.json(await Location.find({ user: req.user._id }).sort("-createdAt")); }
  catch (e) { next(e); }
};

exports.updateLocation = async (req, res, next) => {
  try {
    const { city, country } = req.body;
    const loc = await Location.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { ...(city && { city }), ...(country && { country }) },
      { new: true, runValidators: true }
    );
    if (!loc) return res.status(404).json({ message: "Location not found" });
    res.json(loc);
  } catch (e) { next(e); }
};

exports.deleteLocation = async (req, res, next) => {
  try {
    const loc = await Location.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!loc) return res.status(404).json({ message: "Location not found" });
    res.json({ message: "Location deleted" });
  } catch (e) { next(e); }
};
