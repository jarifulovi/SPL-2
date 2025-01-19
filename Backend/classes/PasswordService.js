import bcrypt from 'bcryptjs';
import User from '../models/User.js';

class PasswordService {

    constructor(password) {
        this.password = password;
    }

    async checkPassword(email) {
        try {
            const storedPassword = await this.retrieveHashedPassword(email);
            return await this.isValidPassword(storedPassword);
        } catch (error) {
            throw new Error("Incorrect password");
        }
    }
    
    async isValidPassword(storedPassword) {
        
        try {
            const com = await bcrypt.compare(this.password, storedPassword);
            return com;
        } catch (error) {
            console.log("Error comparing passwords:", error);
            throw new Error('Error comparing passwords');
        }
    }
    
    
    async retrieveHashedPassword(email) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }
            return user.password;
        } catch (error) {
            console.error('Error retrieving password:', error);
            throw new Error('Unable to retrieve password');
        }
    }

    async hashPassword() {
        try {
            const salt = await bcrypt.genSalt(10); 
            const hashedPassword = await bcrypt.hash(this.password, salt); 
            return hashedPassword;
        } catch (error) {
            console.error('Error hashing password:', error);
            throw new Error('Unable to hash password');
        }
    }

    async changePassword(email,newPassword) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }

            
            const isMatch = await this.checkPassword(email);
            if (!isMatch) {
                throw new Error('Incorrect current password');
            }
          
            
            this.password = newPassword;
            const hashPassword = await this.hashPassword();
            await User.findOneAndUpdate(
                { email }, 
                { password: hashPassword },
                { new: true }
            );
            
            return hashPassword;
        } catch (error) {
            console.error('Error updating password :', error.message);
            throw new Error(error.message);
        }
            
    }

    resetPassword() {
        this.password = '123456';
    }

    generateOTP() {

    }

    sendResetPasswordEmail(email) {

    }
}

export default PasswordService;