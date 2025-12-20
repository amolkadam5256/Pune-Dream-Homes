const Property = require("../../models/Property");

// @desc    Get all sponsored properties
// @route   GET /api/properties/sponsored
// @access  Public
const getSponsoredProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({
      where: {
        isSponsored: true,
        isActive: true,
      },
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] }, // Don't send timestamps to frontend
    });

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    console.error("Error fetching sponsored properties:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch sponsored properties",
      error: error.message,
    });
  }
};

// @desc    Get all properties (with filters)
// @route   GET /api/properties
// @access  Public
const getAllProperties = async (req, res) => {
  try {
    const { isSponsored, isActive, type, location } = req.query;

    // Build where clause dynamically
    const whereClause = {};

    if (isSponsored !== undefined) {
      whereClause.isSponsored = isSponsored === "true";
    }
    if (isActive !== undefined) {
      whereClause.isActive = isActive === "true";
    }
    if (type) {
      whereClause.type = type;
    }
    if (location) {
      whereClause.location = {
        [require("sequelize").Op.iLike]: `%${location}%`,
      };
    }

    const properties = await Property.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
      error: error.message,
    });
  }
};

// @desc    Get single property by ID
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: `Property not found with id: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch property",
      error: error.message,
    });
  }
};

// @desc    Create new property
// @route   POST /api/properties
// @access  Private (add authentication later)
const createProperty = async (req, res) => {
  try {
    const {
      title,
      location,
      type,
      price,
      marketedBy,
      initials,
      image,
      isSponsored,
      isActive,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !location ||
      !type ||
      !price ||
      !marketedBy ||
      !initials ||
      !image
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const property = await Property.create({
      title,
      location,
      type,
      price,
      marketedBy,
      initials,
      image,
      isSponsored: isSponsored !== undefined ? isSponsored : true,
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: property,
    });
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create property",
      error: error.message,
    });
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private
const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: `Property not found with id: ${id}`,
      });
    }

    await property.update(updates);

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: property,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update property",
      error: error.message,
    });
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: `Property not found with id: ${id}`,
      });
    }

    await property.destroy();

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete property",
      error: error.message,
    });
  }
};

module.exports = {
  getSponsoredProperties,
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
