const express = require("express");
const router = express.Router();
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../Middlewares/verifyToken");

const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../Controllers/users.controller");


router.route("/:userId")
.put( verifyTokenAndAuthorization , updateUser)
.get(verifyTokenAndAuthorization, getOneUser)
.delete( verifyTokenAndAuthorization , deleteUser)

router.route("/").get( verifyTokenAndAdmin, getAllUsers);



module.exports = router;
