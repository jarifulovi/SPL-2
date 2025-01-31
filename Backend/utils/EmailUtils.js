import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


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
};
