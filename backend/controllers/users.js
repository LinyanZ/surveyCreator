const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid username or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid username or password.");

  const token = user.generateAuthToken();
  res.cookie("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  });
  res.send({ _id: user._id, username: user.username, isAdmin: user.isAdmin });
};

const logout = async (req, res) => {
  res.cookie("auth-token", null, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: -1,
  });
  res.send("Logged out");
};

const register = async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User already registered.");

  user = new User({ username: req.body.username, password: req.body.password });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.cookie("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  });
  res.send({ _id: user._id, username: user.username, isAdmin: user.isAdmin });
};

module.exports = {
  login,
  logout,
  register,
};
