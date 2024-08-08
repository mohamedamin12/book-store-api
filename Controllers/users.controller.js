const { User, validateUpdateUser } = require("../Models/users.model");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

/**
 *  @desc    update User
 *  @route   /api/user/:userId
 *  @method  Put
 *  @access  private  (only admin)
 */

const updateUser = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  const user = await User.findByIdAndUpdate(
    req.params.userId,
    {
      $set: {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      },
    },
    { new: true }
  ).select("-password");
  res.status(200).json(user);
});

/**
 *  @desc    get All User
 *  @route   /api/user/
 *  @method  Get
 *  @access  private (only admin)
 */

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, { __v: false }).select("-password");
  res.status(200).json(users);
});

/**
 *  @desc    get One User
 *  @route   /api/user/:userId
 *  @method  Get
 *  @access  private (only admin)
 */

const getOneUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: "User Not Found" });
  }
});

/**
 *  @desc    delete User
 *  @route   /api/user/:userId
 *  @method  Delete
 *  @access  private (only admin)
 */

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (user) {
    await User.findByIdAndDelete(req.params.userId);
    return res.status(200).json({ message: "User Has been Deleted" });
  } else {
    return res.status(404).json({ error: "User Not Found" });
  }
});

module.exports = 
{
  updateUser,
  getAllUsers,
  getOneUser,
  deleteUser,
}