import User from "../models/User.js";
import * as PasswordService from "./PasswordService.js";
import * as SessionService from "./SessionService.js";
import * as ProfileService from "./ProfileService.js";
import * as UserService from "./UserService.js";
import EmailUtils from '../utils/EmailUtils.js';

export async function login(email, password) {
    try {
        const isValidPassword = await PasswordService.checkPassword(email, password);
        
        if (isValidPassword) {
            const data = await SessionService.addSessionToken(email);
            return data;
        } else {
            throw new Error('Incorrect Password');
        }
    } catch (error) {
        console.error('Login failed:', error.message);
        throw new Error(error.message || 'Login failed');
    }
}

export async function register(name, email, password) {
    
    try {
        const hashedPassword = await PasswordService.hashPassword(password);
        await UserService.addUser(name, email, hashedPassword);
        await ProfileService.createProfile(email);
        await EmailUtils.sendWelcomeEmail(email);
    } catch (error) {
        console.error('Error during registration:', error.message);
        throw new Error('Error during registration');
    }
    
}

export async function isAuthenticated(email, session_token) {
    try {
        await SessionService.validateSessionToken(email, session_token);
    } catch (error) {
        throw new Error('Error during authentication');
    }
}

export async function logOut(email) {
    try {
        await SessionService.invalidateSessionToken(email);
    } catch (error) {
        console.error('Error during logout:', error);
        throw new Error('Error during logout');
    }
}

export async function updatePassword(email, oldPassword, newPassword) {
    try {
        await PasswordService.changePassword(email, oldPassword, newPassword);
    } catch (error) {
        throw new Error(error.message || 'Failed to update password');
    }
}

export async function forgotPassword(email) {
    try {
        const user = await User.findOne({ email: email });
        if(!user) {
            throw new Error('User does not exist');
        }
        
        const token = await PasswordService.createResetToken(email);
        
        await EmailUtils.sendResetPasswordLink(email, token);
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message || 'Error during forgot password');
    }
}

export async function resetPassword(email, newPassword, token) {
    try {
        const user = await User.findOne({ email: email });
        if(!user) {
            throw new Error('User does not exist');
        }

        await PasswordService.verifyResetToken(token, user);
        await PasswordService.changePasswordAndClearToken(user, newPassword);
        
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message || 'Error during reset password');
    }
}

// Default export for backward compatibility
export default {
    login,
    register,
    isAuthenticated,
    logOut,
    updatePassword,
    forgotPassword,
    resetPassword
};