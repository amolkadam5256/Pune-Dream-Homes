const express = require("express");
const router = express.Router();

const {
  getSponsoredProperties,
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} = require("../properties/propertyController");

// Public routes
router.get("/sponsored", getSponsoredProperties);
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);

// Protected routes (add authentication middleware later)
router.post("/", createProperty);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);

module.exports = router;
