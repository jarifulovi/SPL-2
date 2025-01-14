import User from '../models/User.js';

class UserService {

    constructor() {
        
    }

    async addUser(name,email,hashPassword) {
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
    async removeUser(email) {
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
    async retrieveUser(email) {
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
}

export default UserService;