// backend/server.js

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const prisma = require("./config/prisma");

const app = express();

/* =======================
   Middleware
======================= */

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

/* =======================
   Routes
======================= */

// Root
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Real Estate API Server",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      auth: "/api/auth",
      properties: "/api/properties",
      projects: "/api/projects",
    },
  });
});

// Health check
app.get("/health", async (req, res) => {
  try {
    // Test Prisma connection
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      status: "running",
      environment: process.env.NODE_ENV || "development",
      database: "Connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: "error",
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// Test route
app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Server is working perfectly!",
  });
});

/* =======================
   API Routes
======================= */

// Auth routes
const authRoutes = require("./modules/auth/auth.routes");
app.use("/api/auth", authRoutes);

// Project routes
const projectRoutes = require("./routes/projectRoutes");
app.use("/api/projects", projectRoutes);

// Property routes (uncomment when ready)
// const propertyRoutes = require("./modules/properties/propertyRoutes");
// app.use("/api/properties", propertyRoutes);

// City routes (uncomment when ready)
// const cityRoutes = require("./routes/cityRoutes");
// app.use("/api/cities", cityRoutes);

// Locality routes (uncomment when ready)
// const localityRoutes = require("./routes/localityRoutes");
// app.use("/api/localities", localityRoutes);

// Amenity routes (uncomment when ready)
// const amenityRoutes = require("./routes/amenityRoutes");
// app.use("/api/amenities", amenityRoutes);

/* =======================
   404 Handler
======================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.path}`,
    availableRoutes: [
      "GET /",
      "GET /health",
      "GET /test",
      "POST /api/auth/register",
      "POST /api/auth/login",
      "GET /api/projects",
      "GET /api/projects/featured",
      "GET /api/projects/:identifier",
      "GET /api/projects/city/:cityId",
      "GET /api/projects/locality/:localityId",
      "GET /api/projects/builder/:builderName",
      "GET /api/projects/search",
      "POST /api/projects",
      "PUT /api/projects/:id",
      "DELETE /api/projects/:id",
    ],
  });
});

/* =======================
   Global Error Handler
======================= */

app.use((err, req, res, next) => {
  console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.error("❌ ERROR:", err.message);
  console.error("Stack:", err.stack);
  console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

/* =======================
   Database & Server Start
======================= */

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Test Prisma database connection
    await prisma.$connect();
    console.log("✅ Prisma database connection established successfully");

    // Start Express server
    app.listen(PORT, () => {
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`🗄️  Database: PostgreSQL (Prisma ORM)`);
      console.log(
        `🌐 Frontend URL: ${
          process.env.FRONTEND_URL || "http://localhost:5173"
        }`
      );
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("\n📍 Available Endpoints:");
      console.log("   ┌─ General");
      console.log("   ├─ GET  http://localhost:" + PORT + "/");
      console.log("   ├─ GET  http://localhost:" + PORT + "/health");
      console.log("   └─ GET  http://localhost:" + PORT + "/test");
      console.log("\n   ┌─ Authentication");
      console.log("   ├─ POST http://localhost:" + PORT + "/api/auth/register");
      console.log("   └─ POST http://localhost:" + PORT + "/api/auth/login");
      console.log("\n   ┌─ Projects (Public)");
      console.log("   ├─ GET  http://localhost:" + PORT + "/api/projects");
      console.log(
        "   ├─ GET  http://localhost:" + PORT + "/api/projects/featured"
      );
      console.log(
        "   ├─ GET  http://localhost:" + PORT + "/api/projects/search?query=..."
      );
      console.log(
        "   ├─ GET  http://localhost:" + PORT + "/api/projects/city/:cityId"
      );
      console.log(
        "   ├─ GET  http://localhost:" +
          PORT +
          "/api/projects/locality/:localityId"
      );
      console.log(
        "   ├─ GET  http://localhost:" +
          PORT +
          "/api/projects/builder/:builderName"
      );
      console.log(
        "   ├─ GET  http://localhost:" + PORT + "/api/projects/:identifier"
      );
      console.log(
        "   └─ PATCH http://localhost:" + PORT + "/api/projects/:id/stats"
      );
      console.log("\n   ┌─ Projects (Protected)");
      console.log("   ├─ POST http://localhost:" + PORT + "/api/projects");
      console.log("   ├─ PUT  http://localhost:" + PORT + "/api/projects/:id");
      console.log(
        "   ├─ DELETE http://localhost:" + PORT + "/api/projects/:id"
      );
      console.log(
        "   ├─ POST http://localhost:" + PORT + "/api/projects/:id/images"
      );
      console.log(
        "   ├─ POST http://localhost:" + PORT + "/api/projects/:id/amenities"
      );
      console.log(
        "   └─ POST http://localhost:" + PORT + "/api/projects/:id/floor-plans"
      );
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    });
  } catch (error) {
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.error("❌ Error starting server:", error.message);
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    console.error("\n💡 Database Connection Tips:");
    console.error("   1. Check if PostgreSQL is running");
    console.error("   2. Verify DATABASE_URL in .env file");
    console.error("   3. Ensure database exists");
    console.error("   4. Run: npx prisma migrate dev\n");

    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ UNHANDLED REJECTION! Shutting down...");
  console.error(err.name, err.message);

  // Disconnect Prisma before exit
  prisma.$disconnect().then(() => {
    process.exit(1);
  });
});

// Handle SIGTERM
process.on("SIGTERM", async () => {
  console.log("👋 SIGTERM received. Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});

// Handle SIGINT (Ctrl+C)
process.on("SIGINT", async () => {
  console.log("\n👋 SIGINT received. Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});

startServer();
