// backend/modules/auth/auth.controller.js

const authService = require("./auth.service");

class AuthController {
  // Register/Signup Controller
  async register(req, res) {
    try {
      const { email, password, firstName, lastName, phone, role } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      // Call service
      const result = await authService.register({
        email,
        password,
        firstName,
        lastName,
        phone,
        role,
      });

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Login Controller
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      // Call service
      const result = await authService.login({
        email,
        password,
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new AuthController();
