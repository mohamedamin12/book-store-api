const express = require("express");
const router = express.Router();
const {Register , Login} = require("../Controllers/auth.controller");

// Register User
router.post("/register",Register);

// Login User
router.post("/login",Login);

module.exports = router;
