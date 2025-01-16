import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react"
import { Button } from "../components/ui/button"
import { Flex, Box, Text, Input, VStack, HStack, IconButton } from "@chakra-ui/react"
import { useColorModeValue } from "../components/ui/color-mode";
import { toaster } from "../components/ui/toaster";


import MemberCardOption from "../components/Others/MemberCardOption";
import CustomDialog from "../components/Buttons/CustomDialog";

import GroupMemberApi from "../services/GroupMemberApi";
import GroupApi from "../services/GroupApi";
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


const retrieveGroupMembers = async (group_id, setMembers, navigate) => {
  try {
    const result = await GroupMemberApi.getAllGroupMembers(group_id);
    setMembers(result.data);
  } catch (error) {
    // Group might not exist
    navigate("/groups");
  }
}


const handleMakeAdmin = async (member, group_id) => {
  
  if(isCurrentUser(member.user_id)) {
    toaster.create({
      description: "You are already an admin",
      type: "info"
    });
    return;
  }
  if(member.role === 'admin') {
    toaster.create({
      description: "Already an admin",
      type: "info"
    });
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
    toaster.create({
      description: "Cannot remove yourself",
      type: "info"
    });
    return;
  }
  if(member.role === 'admin') {
    toaster.create({
      description: "Cannot remove an admin",
      type: "info"
    });
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


const handleDeleteGroup = async (group_id, navigate) => {
  try {
    const result = await GroupApi.removeGroup(group_id);
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
  console.log("Deleted group : ", group_id);
  navigate("/groups");
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
  const [ invitationMember, setInvitationMember ] = useState("");


  const fetchData = async () => {
    if (!user_id || !group_id) {
      navigate('/');
      return false;
    }
    await checkAdminStatus(user_id, group_id, navigate);
    await retrieveGroupMembers(group_id, setMembers, navigate);

    return true;
  };

  // Utility to perform operations with validation
  const performWithValidation = async (operation) => {
    const isValid = await fetchData();
    if (isValid) {
      console.log('validation checked');
      await operation();
      //window.location.reload();
    }
  };


  // Invitation functions
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
    fetchData();
  }, []);
  

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
              onMakeAdmin={() => performWithValidation(() => handleMakeAdmin(member, group_id))}
              onRemoveMember={() => performWithValidation(() => handleRemoveMember(member, group_id))}
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
              <Button width="100%" onClick={() => navigate("/updateGroup",{ state: {group_id} })}>Update Group</Button>
              <Input
                width="100%"
                placeholder="Enter user ID"
                value={invitationMember}
                onChange={handleInputChange}
              />
              <Button 
                width="100%" 
                onClick={() => performWithValidation(() => handleInvite())}
              >Invite Member
              </Button>
              <CustomDialog 
                triggerButton={<Button width="100%">Delete Group</Button>}
                dialogTitle="Group Deletion"
                dialogBody="Are you sure you want to delete this group"
                onConfirm={() => performWithValidation(() => handleDeleteGroup(group_id, navigate))}
              />
             
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
// Update rendering after udpdating 