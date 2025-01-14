import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import { IoPersonRemoveSharp } from "react-icons/io5";
import { Button } from "../components/ui/button"
import { Flex, Box, Text, Input, VStack, HStack, IconButton } from "@chakra-ui/react"
import { useColorModeValue } from "../components/ui/color-mode";

import PageLayout from "../components/Others/PageLayout";
import MemberItem from "../components/Others/MemberItem";


// Only accessible to admins joined in a group
const GroupOptions = () => {

  const containerColor = useColorModeValue('gray.200', 'gray.800');

  const location = useLocation();
  const navigate = useNavigate();

  const { group } = location.state || {};
  // Check if the user is admin of the group
  // Retrieve group members + profile pic
  // Render each group members with handler
  // 

  
  return (
    <Flex direction="row" p={4} spacing={4} height="full">
      {/* Left Panel - Member Management */}
      <Box flex="1" p={4} borderRadius="md" bg={containerColor}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Member Management
        </Text>
        {/* Member management content */}
        <VStack align="start" spacing={3}>
          <Button width="100%">View All Users</Button>
          <HStack width="100%" justify="space-between" align="center">
            <Box flex="1">
              <MemberItem member={{ name: "Jhon Doe", email: "@gmail.com" }} />
            </Box>
            <HStack spacing={2}>
              <Button>Make Admin</Button>
              <IconButton><IoPersonRemoveSharp /></IconButton>
            </HStack>
          </HStack>
          
          <Button width="100%">Manage Roles</Button>
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