const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Public routes
router.get('/sponsored', propertyController.getSponsoredProperties);
router.get('/', propertyController.getAllProperties);

// Admin routes (should ideally have auth middleware)
router.post('/', propertyController.createProperty);

module.exports = router;
