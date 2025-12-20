// backend/modules/auth/auth.routes.js

const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");

// Signup/Register Route
router.post("/register", authController.register);

// Login Route
router.post("/login", authController.login);

module.exports = router;
