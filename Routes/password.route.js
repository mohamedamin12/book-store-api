const express = require("express");
const {
  getForgetPasswordView,
  sendForgetPasswordLink,
  getResetPasswordView,
  resetThePassword,
} = require("../Controllers/password.controller");
const router = express.Router();

// /password/forget-password
router
  .route("/forget-password")
  .get(getForgetPasswordView)
  .post(sendForgetPasswordLink);


// /password/reset-password/:userId/:token
router.route("/reset-password/:userId/:token")
  .get(getResetPasswordView)
  .post(resetThePassword)

module.exports = router;