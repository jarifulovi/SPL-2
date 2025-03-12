import User from '../models/User.js';

export async function addUser(name, email, hashPassword) {
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Email is already taken');
        }
        // Create a new user instance
        const newUser = new User({
            name: name,
            email: email,
            password: hashPassword, 
            created_at: new Date(),
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        return savedUser;
    } catch (error) {
        console.error('Error adding user:', error);
        throw new Error(error.message || 'Unable to add user');
    }
}

// Remove a user by email
export async function removeUser(email) {
    try {
        const deletedUser = await User.findOneAndDelete({ email }); 
        if (!deletedUser) {
            throw new Error('User not found');
        }
        return deletedUser;
    } catch (error) {
        console.error('Error removing user:', error);
        throw new Error(error.message || 'Error removing user');
    }
}

// Retrieve user info (id, email, name only)
export async function retrieveUser(email) {
    try {
        const user = await User.findOne({ email })
            .select('user_id email name notifications status last_login created_at');
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        console.error('Error retrieving user:', error);
        throw new Error(error.message || 'Error retrieving user');
    }
}

export async function getUserById(user_id) {
    return await User.findOne({ user_id });
}

