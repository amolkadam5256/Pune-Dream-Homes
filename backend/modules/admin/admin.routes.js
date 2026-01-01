// backend/modules/admin/admin.routes.js

const express = require("express");
const router = express.Router();
const adminController = require("./admin.controller");
const { protect, authorize } = require("../../middleware/authMiddleware");

// All routes here are protected and limited to ADMIN role
router.use(protect);
router.use(authorize("ADMIN"));

// User Management Routes
router.get("/users", adminController.getUsers);
router.post("/users", adminController.createUser);
router.put("/users/:id", adminController.updateUser);
router.delete("/users/:id", adminController.deleteUser);

module.exports = router;
