import User from '../models/User.js';
import crypto from 'crypto';

class SessionService {

    constructor() {
        
    }

    
    generateSessionToken() {
        return crypto.randomBytes(32).toString('hex');
    }

    // Add session token to the user ( update in database )
    async addSessionToken(email) {
        try {
            const sessionToken = this.generateSessionToken();
    
            
            const updatedUser = await User.findOneAndUpdate(
                { email }, 
                { session_token: sessionToken }, 
                { new: true }
            );
    
            if (!updatedUser) {
                throw new Error('User not found');
            }
    
            return { sessionToken, user_id: updatedUser.user_id, email: updatedUser.email, name: updatedUser.name };
        } catch (error) {
            console.error('Error adding session token:', error);
            throw new Error(error.message || 'Unable to add session token');
        }
    }
    
    

    async retrieveSessionToken(email) {
        try {
            
            const user = await User.findOne({email});
    
            
            if (!user) {
                throw new Error('User not found');
            }
    
            return user.session_token;
        } catch (error) {
            console.error('Error retrieving session token:', error);
            throw new Error(error.message || 'Unable to retrieve session token');
        }
    }
    

    isExpired(expire_date) {
        const currentDate = new Date();
        return expire_date < currentDate;
    }

    // Validate the session token against the user
    async validateSessionToken(email,sessionToken) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('Session invalid');
            }
            if (user.session_token === null || user.session_token != sessionToken) {
                throw new Error('Session token is invalid or expired');
            }
            return user;
        } catch (error) {
            throw new Error(error.message || 'Error validating session token');
        }
    }

    async invalidateSessionToken(email) {
        try {
            await User.findOneAndUpdate(
                { email },
                { session_token: null },
                { new: true }
            );
        } catch (error) {
            console.error('Error invalidating session token:', error);
            throw new Error('Unable to invalidate session token');
        }
    }
}

export default SessionService;
