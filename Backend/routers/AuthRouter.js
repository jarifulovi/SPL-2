import express from 'express';
import * as Sanitizer from '../utils/Sanitizer.js';
import * as AuthService from '../services/AuthService.js';


const router = express.Router();

router.post(
    '/isAuthenticated',
    [Sanitizer.validateEmail, Sanitizer.validateTokenInCookie('sessionToken')],
    Sanitizer.handleValidationErrors,
    async (req, res) => {

    try {
        const { email } = req.body;
        const sessionToken = req.cookies.sessionToken;
        

        await AuthService.isAuthenticated(email, sessionToken);

        res.status(201).json({
            success: true,
            message: 'User is logged in',
        });

    } catch (error) {
        console.error('Error during authentication:', error.message);
        res.status(400).json({
            success: false,
            message: error.message || 'An error occurred during login'
        });
    }
});

router.post(
    '/login', 
    [Sanitizer.validateEmail, Sanitizer.validatePassword('password')], 
    Sanitizer.handleValidationErrors,
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
    Sanitizer.handleValidationErrors,
    async (req, res) => {
    
    try {
        const { name, email, password } = req.body;
        await AuthService.register(name, email, password);

        res.status(201).json({
            success: true,
            message: 'User registered successfully'
        });

    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(400).json({
            success: false,
            message: error.message || 'An error occurred during registration'
        });
    }
});


router.post(
    '/logout', 
    [Sanitizer.validateEmail],
    Sanitizer.handleValidationErrors,
    async (req, res) => {
    
    try {
        const { email } = req.body;
        await AuthService.logOut(email); 

        res.clearCookie('sessionToken', {
            httpOnly: true,
            //secure: true,   // For HTTPS in production
            sameSite: 'Strict',
        });

        res.status(201).json({
            success: true,
            message: 'User logged out successfully',
        });

    } catch (error) {
        console.error('Error during logout:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'An error occurred during logout'
        });
    }
    
});

router.post(
    '/updatePassword', 
    [Sanitizer.validateEmail, Sanitizer.validatePassword('old_password'), Sanitizer.validatePassword('new_password')], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {
    

    try {
        const { email, old_password, new_password } = req.body;
        await AuthService.updatePassword(email, old_password, new_password);

        res.status(201).json({
            success: true,
            message: 'User successfully updated password',
        });
    } catch (error) {
        console.error('Error during password update:', error.message);
        res.status(400).json({
            success: false,
            message: error.message || 'An error occurred during updating password'
        });
    }
});


router.post(
    '/forgotPassword', 
    [Sanitizer.validateEmail], 
    Sanitizer.handleValidationErrors,
    async (req, res) => {

    try {
        const { email } = req.body;
        await AuthService.forgotPassword(email);

        res.status(201).json({
            success: true,
            message: 'Reset Password Email sent successfully',
        });
    } catch (error) {
        console.error('Error during forgot password:', error.message);
        res.status(400).json({
            success: false,
            message: error.message || 'An error occurred during forgot password'
        });
    }
});

router.post(
    '/resetPassword', 
    [Sanitizer.validateEmail, Sanitizer.validatePassword('new_password'), Sanitizer.validateTokenInBody('token')],
    Sanitizer.handleValidationErrors,
    async (req, res) => {
    

    try {
        const { email, new_password, token } = req.body;
        await AuthService.resetPassword(email, new_password, token);

        res.status(201).json({
            success: true,
            message: 'Reset Password finished successfully',
        });
    } catch (error) {
        console.error('Error during reset password:', error.message);
        res.status(400).json({
            success: false,
            message: error.message || 'An error occurred during reset password'
        });
    }
});

export default router;