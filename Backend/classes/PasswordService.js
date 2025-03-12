import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import crypto from 'crypto';

export async function checkPassword(email, password) {
    try {
        const storedPassword = await retrieveHashedPassword(email);
        return await isValidPassword(password, storedPassword);
    } catch (error) {
        throw new Error("Incorrect password");
    }
}

export async function isValidPassword(password, storedPassword) {
    try {
        const com = await bcrypt.compare(password, storedPassword);
        return com;
    } catch (error) {
        console.log("Error comparing passwords:", error);
        throw new Error('Error comparing passwords');
    }
}

export async function retrieveHashedPassword(email) {
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

export async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt); 
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Unable to hash password');
    }
}

export async function changePassword(email, oldPassword, newPassword) {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await checkPassword(email, oldPassword);
        if (!isMatch) {
            throw new Error('Incorrect current password');
        }
      
        const hashNewPassword = await hashPassword(newPassword);
        await User.findOneAndUpdate(
            { email }, 
            { password: hashNewPassword },
            { new: true }
        );
        
        return hashNewPassword;
    } catch (error) {
        console.error('Error updating password :', error.message);
        throw new Error(error.message);
    }
        
}

// Forgot password methods
export function generateResetToken() {
    return crypto.randomBytes(32).toString('hex');  
}

export async function createResetToken(email) {
    const token = generateResetToken();
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 1);

    await User.findOneAndUpdate(
        { email }, 
        { 
            reset_token: token, 
            reset_token_expiry: expiry 
        },
        { new: true }
    );

    return token;
}

export async function verifyResetToken(token, user) {
    try {
        if (user.reset_token !== token) {
            throw new Error('Token not found or incorrect');
        }
        
        const currentTime = new Date();
        if (currentTime > new Date(user.reset_token_expiry)) {
            throw new Error('Token has expired');
        }

        return true;
    } catch (error) {
        throw new Error(error.message || 'Error verifying reset token');
    }
}

export async function changePasswordAndClearToken(user, newPassword) {
    try {
        const hashedPassword = await hashPassword(newPassword);

        user.password = hashedPassword;
        user.reset_token = null;
        user.reset_token_expiry = null;

        await user.save();
    } catch (error) {
        throw new Error(error.message || 'Error invalidating reset token');
    }
}