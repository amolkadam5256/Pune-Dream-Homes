// backend/modules/auth/auth.service.js

const bcrypt = require("bcryptjs");
const prisma = require("../../config/prisma");
const { generateToken } = require("../../utils/jwt");

class AuthService {
  // Register new user (Signup)
  async register(data) {
    const { email, password, firstName, lastName, phone, role } = data;

    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Validate role - Don't allow public registration of ADMINs
      let finalRole = role || "CUSTOMER";
      if (finalRole === "ADMIN") {
        finalRole = "CUSTOMER";
      }

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName: firstName || null,
          lastName: lastName || null,
          phone: phone || null,
          role: finalRole,
          isVerified: true, // Set to false if you want email verification
          isActive: true,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          role: true,
          isVerified: true,
          isActive: true,
          createdAt: true,
        },
      });

      // Generate JWT token
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      return {
        success: true,
        message: "User registered successfully",
        user,
        token,
      };
    } catch (error) {
      throw new Error(error.message || "Registration failed");
    }
  }

  // Login user
  async login(data) {
    const { email, password } = data;

    try {
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Check if user is active
      if (!user.isActive) {
        throw new Error(
          "Your account has been deactivated. Please contact support."
        );
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      // Generate JWT token
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      return {
        success: true,
        message: "Login successful",
        user: userWithoutPassword,
        token,
      };
    } catch (error) {
      throw new Error(error.message || "Login failed");
    }
  }
}

module.exports = new AuthService();
