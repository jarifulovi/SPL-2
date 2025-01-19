import PasswordService from "./PasswordService.js";
import SessionService from "./SessionService.js";
import UserClass from "./User.js";
import UserProfileService from "./UserProfileService.js";
import UserService from "./UserService.js";


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
    
}


export default AuthService;