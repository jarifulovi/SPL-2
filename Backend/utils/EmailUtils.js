import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


const sendWelcomeEmail = async (email) => {
    const subject = '🎉 Welcome to StudySync! 🎓';
    const text = `
        Hi there! 👋

        Welcome to StudySync, the best place to connect, collaborate, and boost your learning experience! We're excited to have you join our community.

        To get started:
        - Create or join study groups
        - Share resources and notes
        - Participate in engaging discussions with your peers

        Have any questions or need help? Our team is always here to assist you!

        Happy studying! 📚

        Best regards,
        The StudySync Team
    `;

    await sendEmail(email, subject, text);
};



const sendResetPasswordLink = async (email, token) => {
    const resetUrl = `http://localhost:5173/reset-password?token=${token}`;

    const subject = 'StudySync Password Reset Request';
    const text = `
        Hello,

        We received a request to reset your password for your StudySync account. 
        If you made this request, please reset your password by clicking the link below:

        ${resetUrl}

        If you did not request a password reset, please ignore this email. Your account is safe.

        This link is valid for a limited time.

        Best regards,  
        The StudySync Team
    `;

    await sendEmail(email, subject, text);
};


const sendEmail = async (to, subject, text) => {
    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MY_EMAIL, 
            pass: process.env.EMAIL_PASS, // Email password or application-specific password
        },
    });

    const mailOptions = {
        from: process.env.MY_EMAIL,
        to: to,
        subject: subject,
        text: text,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📩 Email sent successfully to ${to}`);
    } catch (error) {
        console.error('❌ Error sending email:', error);
        throw new Error('Could not send email');
    }
};

export default {
    sendEmail,
    sendWelcomeEmail,
    sendResetPasswordLink,
};
