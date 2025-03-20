import { useState, useEffect } from 'react';
import GroupMemberApi from '../services/GroupMemberApi';


// Custom hook to get group members and check if the current user is an admin
const useGroupMembers = (group_id, currentUserId) => {
  const [groupMembersMap, setGroupMembersMap] = useState({});
  const [groupMembersProPicMap, setGroupMembersProPicMap] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  const retAndUpdateGroupMembers = async (group_id) => {
    try {
      const result = await GroupMemberApi.getAllGroupMembers(group_id);
      const membersMap = result.data.reduce((acc, member) => {
        acc[member.user_id] = member.name;
        return acc;
      }, {});
      const proPicMap = result.data.reduce((acc, member) => {
        acc[member.user_id] = member.profile_picture;
        return acc;
      }, {});
      setGroupMembersMap(membersMap || {});
      setGroupMembersProPicMap(proPicMap || {});

      // Check if the current user is an admin
      const currentUser = result.data.find(member => member.user_id === currentUserId);
      if (currentUser && currentUser.role === 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }

      return membersMap;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (group_id) {
      retAndUpdateGroupMembers(group_id);
    }
  }, [group_id]);

  return { groupMembersMap, groupMembersProPicMap, isAdmin, retAndUpdateGroupMembers };
};

export default useGroupMembers;