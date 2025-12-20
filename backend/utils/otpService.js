const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

exports.generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.sendOTPEmail = async (email, otp, type = 'verification') => {
    const isVerification = type === 'verification';
    const subject = isVerification ? 'Verify your account - Pune Dream Homes' : 'Reset your password - Pune Dream Homes';
    const title = isVerification ? 'Welcome to Pune Dream Homes' : 'Password Reset Request';
    const bodyText = isVerification ? 'Verify your email address to complete your registration. Your OTP code is:' : 'We received a request to reset your password. Use the following code to proceed:';

    const mailOptions = {
        from: `"Pune Dream Homes" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: subject,
        text: `${bodyText} ${otp}. This code will expire in ${process.env.OTP_EXPIRE_MINUTES || 10} minutes.`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                <h2 style="color: #2563eb; text-align: center;">${title}</h2>
                <p>Hello,</p>
                <p>${bodyText}</p>
                <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #1f2937; border-radius: 5px; margin: 20px 0;">
                    ${otp}
                </div>
                <p>This code will expire in ${process.env.OTP_EXPIRE_MINUTES || 10} minutes.</p>
                <p>If you didn't request this code, please ignore this email.</p>
                <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                <p style="font-size: 12px; color: #6b7280; text-align: center;">
                    © 2024 Pune Dream Homes. All rights reserved.
                </p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};
