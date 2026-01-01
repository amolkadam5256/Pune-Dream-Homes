// backend/modules/admin/admin.controller.js

const prisma = require("../../config/prisma");
const bcrypt = require("bcryptjs");

class AdminController {
  // @desc    Get all users (with optional filters)
  // @route   GET /api/admin/users
  // @access  Private (Admin only)
  async getUsers(req, res) {
    try {
      const { role, search, isActive } = req.query;

      const where = {};

      if (role) {
        where.role = role.toUpperCase();
      }

      if (isActive !== undefined) {
        where.isActive = isActive === "true";
      }

      if (search) {
        where.OR = [
          { email: { contains: search, mode: "insensitive" } },
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
        ];
      }

      const users = await prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          role: true,
          isActive: true,
          lastLoginAt: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      res.status(200).json({
        success: true,
        count: users.length,
        data: users,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch users",
        error: error.message,
      });
    }
  }

  // @desc    Create new user (any role)
  // @route   POST /api/admin/users
  // @access  Private (Admin only)
  async createUser(req, res) {
    try {
      const { email, password, firstName, lastName, phone, role } = req.body;

      if (!email || !password || !role) {
        return res.status(400).json({
          success: false,
          message: "Email, password, and role are required",
        });
      }

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User with this email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          phone,
          role: role.toUpperCase(),
          isVerified: true,
          isActive: true, // Default to active
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

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create user",
        error: error.message,
      });
    }
  }

  // @desc    Update user
  // @route   PUT /api/admin/users/:id
  // @access  Private (Admin only)
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { firstName, lastName, phone, isActive, role, password } = req.body;

      const updateData = {
        firstName,
        lastName,
        phone,
        isActive,
        role: role ? role.toUpperCase() : undefined,
      };

      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      // Clean undefined values
      Object.keys(updateData).forEach(
        (key) => updateData[key] === undefined && delete updateData[key]
      );

      const user = await prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isActive: true,
        },
      });

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update user",
        error: error.message,
      });
    }
  }

  // @desc    Delete user
  // @route   DELETE /api/admin/users/:id
  // @access  Private (Admin only)
  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      // Prevent self-deletion
      if (id === req.user.id) {
        return res.status(400).json({
          success: false,
          message: "You cannot delete your own account",
        });
      }

      await prisma.user.delete({
        where: { id },
      });

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete user",
        error: error.message,
      });
    }
  }
}

module.exports = new AdminController();
