const { User, validateRegisterUser , validateLoginUser } = require("../Models/users.model");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Register =   asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ error: "User already exists" });
  }
  req.body.password = await bcrypt.hash(req.body.password, 10);
  user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });
  const newUser = await user.save();
  const token = jwt.sign({id: newUser.id, isAdmin: newUser.isAdmin}, process.env.JWT_SECRET_KEY);
  const { password, ...other } = newUser._doc;
  res.status(201).json({ ...other , token});
});

const Login = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "Invalid Email Or Password" });
  }

  const matchPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!matchPassword) {
    res.status(400).json({ error: "Invalid Email Or Password" });
  }
  
  const token = jwt.sign({id: user.id , isAdmin: user.isAdmin}, process.env.JWT_SECRET_KEY);
  const { password, ...other } = user._doc;
  res.status(201).json({ ...other, token });
});


module.exports = {
  Register,
  Login,
};