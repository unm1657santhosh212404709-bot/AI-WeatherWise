const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const token = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
const shape = (u) => ({ id: u._id, name: u.name, email: u.email, role: u.role });

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "name, email and password are required" });
    if (await User.findOne({ email })) return res.status(400).json({ message: "Email already registered" });
    const user = await User.create({ name, email, password: await bcrypt.hash(String(password), 10) });
    res.status(201).json({ user: shape(user), token: token(user._id) });
  } catch (e) { next(e); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(String(password), user.password)))
      return res.status(401).json({ message: "Invalid email or password" });
    if (user.suspended) return res.status(403).json({ message: "Account suspended" });
    res.json({ user: shape(user), token: token(user._id) });
  } catch (e) { next(e); }
};

exports.getProfile = (req, res) => res.json(shape(req.user));

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (password) user.password = await bcrypt.hash(String(password), 10);
    await user.save();
    res.json(shape(user));
  } catch (e) { next(e); }
};
