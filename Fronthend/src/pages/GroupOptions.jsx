import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react"
import { IoPersonRemoveSharp } from "react-icons/io5";
import { Button } from "../components/ui/button"
import { Flex, Box, Text, Input, VStack, HStack, IconButton } from "@chakra-ui/react"
import { useColorModeValue } from "../components/ui/color-mode";
import { toaster } from "../components/ui/toaster";


import MemberCardOption from "../components/Others/MemberCardOption";
import CustomDialog from "../components/Buttons/CustomDialog";

import GroupMemberApi from "../services/GroupMemberApi";
import { SocketContext } from "../utils/SocketContext";


const isCurrentUser = (member_id) => {
  const current_user_id = localStorage.getItem('user_id');
  return current_user_id === member_id;
}

const isEmail = (input) => /\S+@\S+\.\S+/.test(input);

const findMemberByEmailOrId = (input, members) => {
  if (isEmail(input)) {
    return members.find((member) => member.email === input);
  } else {
    return members.find((member) => member.user_id === input);
  }
};

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


const handleMakeAdmin = async (member, group_id) => {
  
  if(isCurrentUser(member.user_id)) {
    console.log('This is you');
    return;
  }
  if(member.role === 'admin') {
    console.log('Already an admin');
    return;
  }

  try {
    const result = await GroupMemberApi.updateMemberRole(member.user_id, group_id, 'admin');
    if(result.success) {
      toaster.create({
        description: result.message,
        type: "success"
      });
    }
    console.log('New admin: ',member.name);
  } catch (error) {
    toaster.create({
      description: error.message,
      type: "error"
    })
  } 
}


const handleRemoveMember = async (member, group_id) => {
  // Except current user and admins
  if(isCurrentUser(member.user_id)) {
    console.log('This is you');
    return;
  }
  if(member.role === 'admin') {
    console.log('Cannot remove an admin');
    return;
  }

  try {
    const result = await GroupMemberApi.removeMember(member.user_id, group_id);
    if(result.success) {
      toaster.create({
        description: result.message,
        type: "success"
      });
    }
  } catch (error) {
    toaster.create({
      description: error.message,
      type: "error"
    });
  }
  console.log('Removed : ',member.name);
}




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
  const { onEvent, emitEvent } = useContext(SocketContext);

  // Invitation functions
  const [ invitationMember, setInvitationMember ] = useState("");
  const handleInputChange = (e) => {
    setInvitationMember(e.target.value);
  };

  const handleInvite = () => {
    if (!invitationMember.trim()) {
      toaster.create({
        description: "Please enter a valid user ID.",
        type: "info"
      });
      return;
    }
    
    const member = findMemberByEmailOrId(invitationMember, members);
    if (!member) {
      
      console.log(`Inviting member with user_id: ${invitationMember}`);
      emitEvent("groupInvite", invitationMember, group_id, user_id);
    } else {
      toaster.create({
        description: "User is already in the group",
        type: "info"
      });
    }
   
    setInvitationMember("");
  };
  

  // Functions of first mount
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
    console.log(members);
  }, [user_id, group_id, navigate]);
  

  // Handle invitation error event
  useEffect(() => {
    const handleGroupInviteErrors = (error) => {
      
      toaster.create({
        description: error.message,
        type: 'info',
      });
    };
    onEvent('errorNotification', handleGroupInviteErrors);
  }, [onEvent]);
  
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
            <MemberCardOption
              key={index}
              member={member}
              onMakeAdmin={() => handleMakeAdmin(member, group_id)}
              onRemoveMember={() => handleRemoveMember(member, group_id)}
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
              <Input
                width="100%"
                placeholder="Enter user ID"
                value={invitationMember}
                onChange={handleInputChange}
              />
              <Button 
                width="100%" 
                onClick={() => handleInvite()}
              >Invite Member
              </Button>
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


// Task to do letter
// Before performing any operation call the first mount 
// Implement delete group
// Find a way to update group