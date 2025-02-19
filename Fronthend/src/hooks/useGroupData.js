import { useState, useEffect } from 'react';
import GroupMemberApi from '../services/GroupMemberApi';





const useGroupData = (user_id) => {
  const [groupsData, setGroupsData] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      const result = await GroupMemberApi.getAllGroupsOfMember(user_id);
      setGroupsData(result.data || []);
      if (result.data && result.data.length > 0) {
        setSelectedGroup(result.data[0]);
      }
    };
    fetchGroups();
  }, [user_id]);

  return { groupsData, selectedGroup, setSelectedGroup };
};

export default useGroupData;