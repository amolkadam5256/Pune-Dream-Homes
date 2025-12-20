// backend/routes/projectRoutes.js

const express = require("express");
const router = express.Router();

const {
  // Public Routes
  getFeaturedProjects,
  getAllProjects,
  getProjectsByCity,
  getProjectsByLocality,
  getProjectsByBuilder,
  searchProjects,
  getProjectById,

  // Protected Routes
  createProject,
  updateProject,
  deleteProject,

  // Project Resources
  addProjectImages,
  addProjectAmenities,
  addFloorPlans,
  updateProjectStats,
} = require("../controllers/projectController");

// ==================== PUBLIC ROUTES ====================
// Note: Order matters! Specific routes must come BEFORE dynamic routes

// Featured/Premium projects for homepage
router.get("/featured", getFeaturedProjects);

// Search projects (must be before /:identifier)
router.get("/search", searchProjects);

// Get projects by city (must be before /:identifier)
router.get("/city/:cityId", getProjectsByCity);

// Get projects by locality (must be before /:identifier)
router.get("/locality/:localityId", getProjectsByLocality);

// Get projects by builder (must be before /:identifier)
router.get("/builder/:builderName", getProjectsByBuilder);

// Get all projects with filters (must be before /:identifier)
router.get("/", getAllProjects);

// Get single project by ID or slug (MUST BE LAST among GET routes)
router.get("/:identifier", getProjectById);

// Update project statistics (view, inquiry, favorite, share count)
router.patch("/:id/stats", updateProjectStats);

// ==================== PROTECTED ROUTES ====================
// TODO: Add authentication middleware
// Example: router.post("/", authenticate, authorize("ADMIN", "AGENT"), createProject);

// Create new project
router.post("/", createProject);

// Update project
router.put("/:id", updateProject);

// Delete project (soft delete by default, ?permanent=true for hard delete)
router.delete("/:id", deleteProject);

// ==================== PROJECT RESOURCES ====================

// Add images to project
router.post("/:id/images", addProjectImages);

// Add amenities to project
router.post("/:id/amenities", addProjectAmenities);

// Add floor plans to project
router.post("/:id/floor-plans", addFloorPlans);

module.exports = router;
