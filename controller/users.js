const jwt = require("jsonwebtoken");
const { removeSpaces } = require("../helpers.js");
const User = require("../models/User.js");

// Register Controller
module.exports.register = async (req, res) => {
  let { name, username, email, password, role } = req.body;
  username = removeSpaces(username);
  let user = new User({ username, email, name, role });
  user = await User.register(user, password);
  let token = jwt.sign({ _id: user._id }, process.env.SECRET);
  res.json({
    status: "success",
    message: "Registration Successfull",
    name,
    username,
    email,
    role,
    token,
  });
};

// Login Controller
module.exports.login = (req, res) => {
  console.log(`Logged In ${req.user}`);
  let { name, username, role, email } = req.user;
  let token = jwt.sign({ _id: req.user._id }, process.env.SECRET);
  res.json({
    status: "success",
    message: "Registration Successfull",
    name,
    username,
    email,
    role,
    token,
  });
};
