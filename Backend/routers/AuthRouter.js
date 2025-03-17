import express from 'express';
import * as Sanitizer from '../utils/Sanitizer.js';
import * as AuthService from '../services/AuthService.js';
import * as RouterUtils from '../utils/RouterUtils.js';


const router = express.Router();

router.post(
    '/isAuthenticated',
    [Sanitizer.validateEmail, Sanitizer.validateTokenInCookie('sessionToken')],
    Sanitizer.handleValidationErrors('isAuthenticated', false),
    async (req, res) => {
        const { email } = req.body;
        const sessionToken = req.cookies.sessionToken;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return AuthService.isAuthenticated(email, sessionToken);
        }, 'User authentication check', 'User is authenticated');
    }
);

router.post(
    '/login', 
    [Sanitizer.validateEmail, Sanitizer.validatePassword('password')], 
    Sanitizer.handleValidationErrors('Login'),
    async (req, res) => {

    try {
        const { email, password } = req.body;
        const result = await AuthService.login(email, password);
        const { sessionToken, user_id, name } = result;

        res.cookie('sessionToken', sessionToken, {
            httpOnly: true,
            //secure: true,   // For HTTPS in production
            sameSite: 'strict', // Prevent CSRF
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.status(201).json({
            success: true,
            message: 'User login successfully',
            data: { user_id, email, name }
        });

    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(400).json({
            success: false,
            message: error.message || 'An error occurred during login'
        });
    }
});

router.post(
    '/register', 
    [Sanitizer.validateContent('name', 3, 50), Sanitizer.validateEmail, Sanitizer.validatePassword('password')], 
    Sanitizer.handleValidationErrors('Register'),
    async (req, res) => {
        const { name, email, password } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return AuthService.register(name, email, password);
        }, 'Register user', 'User registered successfully');
    }
);


router.post(
    '/logout', 
    [Sanitizer.validateEmail],
    Sanitizer.handleValidationErrors('Logout'),
    async (req, res) => {

        res.clearCookie('sessionToken', {
            httpOnly: true,
            //secure: true,   // For HTTPS in production
            sameSite: 'Strict',
        });
        const { email } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return AuthService.logOut(email);
        }, 'Logout', 'User logged out successfully');
    }
);

router.post(
    '/updatePassword', 
    [Sanitizer.validateEmail, Sanitizer.validatePassword('old_password'), Sanitizer.validatePassword('new_password')], 
    Sanitizer.handleValidationErrors('UpdatePassword'),
    async (req, res) => {
        const { email, old_password, new_password } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return AuthService.updatePassword(email, old_password, new_password);
        }, 'Update password', 'Password updated successfully');
    }
);


router.post(
    '/forgotPassword', 
    [Sanitizer.validateEmail], 
    Sanitizer.handleValidationErrors('ForgotPassword'),
    async (req, res) => {
        const { email } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return AuthService.forgotPassword(email);
        }, 'Forgot password', 'Reset Password Email sent successfully');
    }
);
        

router.post(
    '/resetPassword', 
    [Sanitizer.validateEmail, Sanitizer.validatePassword('new_password'), Sanitizer.validateTokenInBody('token')],
    Sanitizer.handleValidationErrors('ResetPassword'),
    async (req, res) => {
        const { email, new_password, token } = req.body;
        await RouterUtils.handleBasicRequest(req, res, async () => {
            return AuthService.resetPassword(email, new_password, token);
        }, 'Reset password', 'Password reset successfully');
    }
);

export default router;