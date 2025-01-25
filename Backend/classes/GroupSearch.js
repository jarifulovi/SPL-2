import Group from '../models/Group.js';

class GroupSearch {
    constructor(type = '', topics = '', group_size = '') {
        this.type = type;
        this.topics = topics;
        this.group_size = group_size;
    }

    
    async retrieveAllGroups() {
        try {
            const groups = await Group.find({ group_status: 'public' });
            return groups;
        } catch (error) {
            console.error('Error retrieving all groups:', error.message);
            throw new Error('Failed to retrieve groups.');
        }
    }

    // SearchQuery is the name for group
    async searchGroup(searchQuery = '') {
        try {
            const query = { group_status: 'public' };

            // Add filters to query
            if (this.type) query.type = this.type;
            if (this.topics && this.topics.length > 0) query.topics = { $in: this.topics };
            if (this.group_size) query.group_size = { $lte: this.group_size };

            // Add group_name filter if searchQuery is provided
            if (searchQuery.trim()) {
                query.group_name = { $regex: searchQuery.trim(), $options: 'i' }; // Case-insensitive search
            }

            const groups = await Group.find(query);
            return groups;
        } catch (error) {
            console.error('Error searching for groups:', error.message);
            throw new Error('Failed to search for groups.');
        }
    }
}

export default GroupSearch;
