import express from 'express';
import AuthService from '../classes/AuthService.js';

const router = express.Router();


router.post('/isAuthenticated', async (req, res) => {
    try {
        const { email } = req.body;
        const sessionToken = req.cookies.sessionToken;
        

        if (!email || !sessionToken) {
            return res.status(400).json({
                success: false,
                message: 'Email and session token are required',
            });
        }

        const authService = new AuthService();
        await authService.isAuthenticated(email, sessionToken);
        

        res.status(201).json({
            success: true,
            message: 'User is logged in',
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'An error occurred during login'
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const authService = new AuthService();
        const result = await authService.login(email, password);
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
        res.status(400).json({
            success: false,
            message: error.message || 'An error occurred during login'
        });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const authService = new AuthService();
        const result = await authService.register(name, email, password);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: result
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'An error occurred during registration'
        });
    }
});


router.post('/logout', async (req, res) => {
    try {
        const { email } = req.body;
        const authService = new AuthService();
        await authService.logOut(email); 

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
        res.status(400).json({
            success: false,
            message: error.message || 'An error occurred during logout'
        });
    }
    
});

router.post("/updatePassword", async (req, res) => {
    try {
        const { email, old_password, new_password } = req.body;
        const authService = new AuthService();
        await authService.updatePassword(email, old_password, new_password);

        res.status(201).json({
            success: true,
            message: 'User successfully updated password',
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'An error occurred during updating password'
        });
    }
})


router.post('/forgotPassword', async (req, res) => {
    try {
        const { email } = req.body;
        const authService = new AuthService();
        await authService.forgotPassword(email);

        res.status(201).json({
            success: true,
            message: 'Reset Password Email send successfully',
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'An error occurred during forgot password'
        });
    }
    
});

router.post('/resetPassword', async (req, res) => {
    try {
        const { email, newPassword, token} = req.body;

        
        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Token is required',
            });
        }

        const authService = new AuthService();
        await authService.resetPassword(email, newPassword, token);

        res.status(201).json({
            success: true,
            message: 'Reset Password finished successfully',
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'An error occurred during reset password'
        });
    }
});

export default router;