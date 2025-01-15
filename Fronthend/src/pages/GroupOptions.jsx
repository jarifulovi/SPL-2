import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import { IoPersonRemoveSharp } from "react-icons/io5";
import { Button } from "../components/ui/button"
import { Flex, Box, Text, Input, VStack, HStack, IconButton } from "@chakra-ui/react"
import { useColorModeValue } from "../components/ui/color-mode";

import MemberItem from "../components/Others/MemberItem";

import GroupMemberApi from "../services/GroupMemberApi";


const checkAdminStatus = async (user_id, group_id, navigate) => {
  try {
    const result = await GroupMemberApi.getUserRole(user_id, group_id);
    if (!result.data.isAdmin) {
      navigate('/');
    }
    console.log('admin checked');
  } catch (error) {
    console.error(error.message);
    navigate('/');
  }
};


const retrieveGroupMembers = async (group_id, setMembers) => {
  try {
    const result = await GroupMemberApi.getAllGroupMembers(group_id);
    setMembers(result.data);
  } catch (error) {
    console.log(error.message);
  }
}


const handleMakeAdmin = async (member) => {
  // Current user already admin
  // Don't work on admins
  console.log('New admin: ',member.name);
}


const handleRemoveMember = async (member) => {
  // Except current user and admins
  console.log('Removed : ',member.name);
}


const MemberCard = ({ member, onMakeAdmin, onRemoveMember }) => {
  return (
    <HStack width="100%" justify="space-between" align="center">
      <Box flex="1">
        <MemberItem member={member} />
      </Box>
      <HStack spacing={2}>
        <Button onClick={() => onMakeAdmin(member)}>Make Admin</Button>
        <IconButton aria-label="Remove member" onClick={() => onRemoveMember(member)}>
          <IoPersonRemoveSharp />
        </IconButton>
      </HStack>
    </HStack>
  );
};


// Only accessible to admins joined in a group
// Needs to check admin before any operation
const GroupOptions = () => {

  const containerColor = useColorModeValue('gray.200', 'gray.800');

  const location = useLocation();
  const navigate = useNavigate();
  const user_id = localStorage.getItem('user_id');
  const { group } = location.state || {};
  const group_id = group?.group_id;

  const [members, setMembers] = useState([]);
  // Check if the user is admin of the group
  // Retrieve group members
  useEffect(() => {
    if (!user_id || !group_id) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      await checkAdminStatus(user_id, group_id, navigate);
      await retrieveGroupMembers(group_id, setMembers);
    };

    fetchData();
  }, [user_id, group_id, navigate]);
  


  
  return (
    <Flex direction="row" p={4} spacing={4} height="full">
      {/* Left Panel - Member Management */}
      <Box flex="1" p={4} borderRadius="md" bg={containerColor}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Member Management
        </Text>
        {/* Member management content */}
        <VStack align="start" spacing={3}>
          
          {members.map((member, index) => (
            <MemberCard
              key={index}
              member={member}
              onMakeAdmin={handleMakeAdmin}
              onRemoveMember={handleRemoveMember}
            />
          ))}
          
        </VStack>

      </Box>

      {/* Right Panel - Update/Delete & Basic Settings */}
      <Box flex="1" ml={4}>
        <Flex direction="column" height="100%" spacing={4}>
          {/* Upper Right - Update/Delete */}
          <Box p={4} borderRadius="md" bg={containerColor}>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Update or Delete Groups
            </Text>
            {/* Update/Delete content */}
            <VStack align="start" spacing={3}>
              <Button width="100%">Update Group</Button>
              <Button width="100%">Invite Member</Button>
              <Button width="100%">Delete Group</Button>
            </VStack>
          </Box>

          {/* Lower Right - Basic Settings */}
          <Box p={4} borderRadius="md" mt={4} bg={containerColor}>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Basic Settings
            </Text>
            {/* Basic settings content */}
            <VStack align="start" spacing={3}>
              <Button width="100%">Configure Notifications</Button>
              <Button width="100%">Security Settings</Button>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default GroupOptions;