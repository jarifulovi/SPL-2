import mongoose from "mongoose";
import User from "../models/User.js";
import Group from "../models/Group.js";
import UserGroup from "../models/UserGroup.js";

class GroupMembers {
    constructor(group_id) {
        this.group_id = group_id || '';
        this.members = [];
        this.admins = [];
    }

    async isMemberOfGroup(user_id) {
        try {
            
            const membership = await UserGroup.findOne({
                user_id: user_id,
                group_id: this.group_id,
            });
            
            // Return true if membership exists, otherwise false
            return !!membership;
        } catch (error) {
            throw new Error("Unable to check group membership");
        }
    }
    

    async addAdmin(user_id) {
        return this.joinMember(user_id, 'admin');
    }

    async joinMember(user_id,role) {
        
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const user = await User.findOne({user_id: user_id});
            if (!user) {
                throw new Error('User not found');
            }

            const updatedGroup = await Group.findOneAndUpdate(
                { group_id: this.group_id },
                { $inc: {group_size: 1} },
                { new: true, session }
            );
            

            if (!updatedGroup) {
                throw new Error('Group not found');
            }

            // Check if the user is already a member of the group
            const existingMember = await UserGroup.findOne({ user_id: user_id, group_id: this.group_id });
            if (existingMember) {
                throw new Error('User is already a member of the group');
            }

            const userGroup = new UserGroup({
                user_id: user_id,
                group_id: this.group_id,
                role: role,
            });
            await userGroup.save({ session });


            await session.commitTransaction();
            session.endSession();

        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            
            throw new Error(error.message || 'Error during joining group');
        }
    }

    async removeMember(user_id) {
        try {
            const session = await mongoose.startSession();
            session.startTransaction();

            const user = await User.findOne({user_id: user_id});
            if(!user){
                throw new Error('User not found');
            }

            const updatedGroup = await Group.findOneAndUpdate(
                { group_id: this.group_id },
                { $inc: {group_size: -1} },
                { new: true, session }
            );

            if (!updatedGroup) {
                throw new Error('Group not found');
            }

            const userGroup = await UserGroup.findOneAndDelete(
                { user_id: user_id, group_id: this.group_id },
                { session }
            );

            await session.commitTransaction();
            session.endSession();
        } catch (error) {
            console.error('Error during removing member:', error.message);
            throw new Error(error.message || 'Error during removing member');
        }
    }

    async retrieveAllGroupMembers() {
        return this._getMembersByRole();
    }

    async retrieveAllAdmins() {
        return this._getMembersByRole('admin');
    }

    async getAllGroupsOfMember(user_id) {
        try {
            
            const groups = await UserGroup.find({ user_id: user_id });
            if (groups.length === 0) {
                return [];
            }
    
            const groupIds = groups.map(group => group.group_id);
            const groupDetails = await Group.find({ group_id: { $in: groupIds } });
            
            return groupDetails;
        } catch (error) {          
            console.error(error.message || 'Error during fetching groups of the member');
            return [];
        }
    }
    

    async updateMemberRole(user_id, role) {
        try {
            const userGroup = await UserGroup.findOneAndUpdate(
                { user_id: user_id, group_id: this.group_id },
                { role: role },
                { new: true }
            );

            if (!userGroup) {
                throw new Error('User not found in the group');
            }

            return userGroup;
        } catch (error) {
            throw new Error(error.message || 'Error during updating member role');
        }
    }

    async getUserRole(user_id) {
        const userGroup = await UserGroup.findOne({ user_id: user_id, group_id: this.group_id });
        if (!userGroup) {
            return { isMember: false, isAdmin: false };
        }
        return {
            isMember: true,
            isAdmin: userGroup.role === 'admin',
        };
    }
    
    

    async _getMembersByRole(role) {
        try {
            const query = { group_id: this.group_id };
            if (role) {
                query.role = role;
            }

            const members = await UserGroup.find(query);
            if (!members) {
                throw new Error(`${role ? 'Admins' : 'Members'} not found`);
            }
            if (members.length === 0) {
                throw new Error('This group has no members or admins');
            }

            // Extract user IDs from the userGroup entries
            const userIds = members.map(member => member.user_id);
            

            // Fetch user details (name, email) for all user IDs
            const users = await User.find({ user_id: { $in: userIds } }, 'user_id name email -_id');
            
            const data = members.map(member => {
                const user = users.find(u => u.user_id === member.user_id);
                return {
                    user_id: member.user_id,
                    role: member.role,
                    name: user ? user.name : 'N/A',
                    email: user ? user.email : 'N/A'
                };
            });
            

            return data;
        } catch (error) {
            throw new Error(error.message || `Error during fetching ${role ? 'admins' : 'members'}`);
        }
    }
}

export default GroupMembers;