import User from "../models/User.js";
import PasswordService from "./PasswordService.js";
import SessionService from "./SessionService.js";
import UserClass from "./User.js";
import UserProfileService from "./UserProfileService.js";
import UserService from "./UserService.js";
import EmailUtils from '../utils/EmailUtils.js';

class AuthService {

    constructor() {
        
    }

    async login(email,password) {
        try {
            const passwordService = new PasswordService(password);
            const isValidPassword = await passwordService.checkPassword(email);
            
            if (isValidPassword) {
                
                const sessionService = new SessionService();
                const data = await sessionService.addSessionToken(email);

                return data;
            } else {
                throw new Error('Incorrect Password');
            }
        } catch (error) {
            console.error('Login failed:', error.message);
            throw new Error(error.message || 'Login failed');
        }
    }
    
    async register(name,email,password) {
        
        try {
            const passwordService = new PasswordService(password);
            const hashedPassword = await passwordService.hashPassword();
            const userService = new UserService();
            await userService.addUser(name,email,hashedPassword);
            const profileService = new UserProfileService();
            await profileService.createProfile(email);
        } catch (error) {
            console.error('Error during registration:', error.message);
            throw new Error('Error during registration');
        }
        
    }

    async isAuthenticated(email,session_token) {
        try {
            const sessionService = new SessionService();
            await sessionService.validateSessionToken(email,session_token);
    
        } catch (error) {
            throw new Error('Error during authentication');
        }
    }

    async logOut(email) {
        try {
            const sessionService = new SessionService();
            await sessionService.invalidateSessionToken(email);
        } catch (error) {
            console.error('Error during logout:', error);
            throw new Error('Error during logout');
        }
    }

    
    async updatePassword(email, oldPassword, newPassword) {
        try {
            const passwordService = new PasswordService(oldPassword);
            await passwordService.changePassword(email, newPassword);
        } catch (error) {
            throw new Error(error.message || 'Failed to update password');
        }
    }

    async forgotPassword(email) {

        try {
            const user = await User.findOne({ email: email });
            if(!user) {
                throw new Error('User does not exist');
            }
            
            const passwordService = new PasswordService();
            const token = await passwordService.createResetToken(email);
            const resetUrl = `http://localhost/reset-password?token=${token}`;
            const subject = 'Reset Password Request';
            const text = `To reset your password, click the link below or copy-paste it into your browser: ${resetUrl}`;

            await EmailUtils.sendEmail(email, subject, text);
        } catch (error) {
            console.log(error.message);
            throw new Error(error.message || 'Error during forgot password');
        }
        
    }

    async resetPassword(email, newPassword, token) {
        try {
            const user = await User.findOne({ email: email });
            if(!user) {
                throw new Error('User does not exist');
            }

            const passwordService = new PasswordService();
            await passwordService.verifyResetToken(token, user);
            await passwordService.changePasswordAndClearToken(user, newPassword);
            
        } catch (error) {
            console.log(error.message);
            throw new Error(error.message || 'Error during reset password');
        }
    }
    
}


export default AuthService;