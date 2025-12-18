const { User } = require('../models');
const { generateToken } = require('../utils/jwt');
const { generateOTP, sendOTPEmail } = require('../utils/otpService');
const { Op } = require('sequelize');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ email }, { phoneNumber }]
            }
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email or phone number'
            });
        }

        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + (process.env.OTP_EXPIRE_MINUTES || 10) * 60000);

        const user = await User.create({
            fullName,
            email,
            phoneNumber,
            password,
            role,
            otp,
            otpExpires
        });

        // Send OTP via email
        const emailSent = await sendOTPEmail(email, otp);

        res.status(201).json({
            success: true,
            message: emailSent ? 'Registration successful. OTP sent to email.' : 'Registration successful, but failed to send OTP. Please resend.',
            userId: user.id
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: 'Email already verified'
            });
        }

        if (user.otp !== otp || user.otpExpires < new Date()) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired OTP'
            });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        const token = generateToken(user.id);

        res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            token,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                message: 'Please verify your email first',
                isVerified: false
            });
        }

        const token = generateToken(user.id);

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password', 'otp', 'otpExpires'] }
        });

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Resend OTP
// @route   POST /api/auth/resend-otp
// @access  Public
exports.resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: 'Email already verified'
            });
        }

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpires = new Date(Date.now() + (process.env.OTP_EXPIRE_MINUTES || 10) * 60000);
        await user.save();

        const emailSent = await sendOTPEmail(email, otp);

        res.status(200).json({
            success: true,
            message: emailSent ? 'OTP sent to email.' : 'Failed to send OTP email.'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
};

// @desc    Forgot Password
exports.forgotPassword = async (req, res) => {
    // Basic implementation for now
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        const otp = generateOTP();
        user.resetPasswordToken = otp;
        user.resetPasswordExpires = new Date(Date.now() + 15 * 60000); // 15 mins
        await user.save();

        await sendOTPEmail(email, otp); // Reusing for reset too

        res.status(200).json({ success: true, message: 'Reset code sent to email' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Verify Reset OTP
exports.verifyResetOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({
            where: {
                email,
                resetPasswordToken: otp,
                resetPasswordExpires: { [Op.gt]: new Date() }
            }
        });

        if (!user) return res.status(400).json({ success: false, message: 'Invalid or expired reset code' });

        res.status(200).json({ success: true, message: 'Reset code verified' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body;
        const user = await User.findOne({
            where: {
                email,
                resetPasswordToken: otp,
                resetPasswordExpires: { [Op.gt]: new Date() }
            }
        });

        if (!user) return res.status(400).json({ success: false, message: 'Invalid or expired reset code' });

        user.password = password;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};