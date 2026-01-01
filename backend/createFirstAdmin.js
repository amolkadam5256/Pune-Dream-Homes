// backend/createFirstAdmin.js
// Script to create the first admin user for the system

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function createFirstAdmin() {
  console.log("🔧 Creating first admin user...\n");

  try {
    // Check if any admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });

    if (existingAdmin) {
      console.log("⚠️  An admin user already exists!");
      console.log("📧 Email:", existingAdmin.email);
      console.log("\nIf you forgot the password, you can:");
      console.log("1. Delete this admin from the database");
      console.log("2. Run this script again\n");
      return;
    }

    // Admin credentials
    const adminData = {
      email: "admin@punedreamhomes.com",
      password: "Admin@punedreamhomes123",
      firstName: "Super",
      lastName: "Admin",
      phone: "+91 9876543210",
    };

    // Hash password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: adminData.email,
        password: hashedPassword,
        firstName: adminData.firstName,
        lastName: adminData.lastName,
        phone: adminData.phone,
        role: "ADMIN",
        isVerified: true,
        isActive: true,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
    });

    console.log("✅ First admin created successfully!\n");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📋 Admin Credentials:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 Email:    ", adminData.email);
    console.log("🔑 Password: ", adminData.password);
    console.log("👤 Name:     ", `${admin.firstName} ${admin.lastName}`);
    console.log("📱 Phone:    ", adminData.phone);
    console.log("🆔 User ID:  ", admin.id);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    console.log("🌐 Next Steps:");
    console.log("1. Go to: http://localhost:5173/auth/login");
    console.log("2. Login with the credentials above");
    console.log(
      "3. Access Admin Dashboard: http://localhost:5173/admin/admin-dashboard"
    );
    console.log("\n⚠️  IMPORTANT: Change the password after first login!\n");
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);

    if (error.code === "P2002") {
      console.log("\n⚠️  A user with this email already exists.");
      console.log("Please check the database or use a different email.\n");
    }
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function
createFirstAdmin();
