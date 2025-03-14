import Group from '../models/Group.js';

export async function retrieveAllGroups() {
    try {
        const groups = await Group.find({ group_status: 'public' });
        return groups;
    } catch (error) {
        console.error('Error retrieving all groups:', error.message);
        throw new Error('Failed to retrieve groups.');
    }
}

// SearchQuery is the name for group
export async function searchGroup(searchQuery = '', type = '', topics = '', group_size = '') {
    try {
        const query = { group_status: 'public' };

        // Add filters to query
        if (type) query.type = type;
        if (topics && topics.length > 0) query.topics = { $in: topics };
        if (group_size) query.group_size = { $lte: group_size };

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
