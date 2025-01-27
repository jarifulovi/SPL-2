import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react"
import { Button } from "../components/ui/button"
import { Flex, Box, Text, Badge, Stack, useBreakpointValue, HStack, VStack } from "@chakra-ui/react"
import { useColorModeValue } from '../components/ui/color-mode';


import GroupCard from "../components/Others/GroupCard";
import DetailField from "../components/Fragments/DetailField";
import DetailArrayField from "../components/Fragments/DetailArrayField";
import CustomDialog from "../components/Buttons/CustomDialog";
import CustomSpinner from "../components/Others/CustomSpinnner";

import GroupMemberApi from '../services/GroupMemberApi';
import { SocketContext } from '../utils/SocketContext';




const GroupDetails = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { group } = location.state || {};
  const [ isMember, setIsMember ] = useState(false);
  const user_id = localStorage.getItem('user_id');
  const name = localStorage.getItem('name');
  const { onEvent, offEvent, emitEvent } = useContext(SocketContext);
  
  // group_name, description, created_by: creator(id), type, topics, group_id
  // created_at
  // Check if the user is member of the group

  useEffect(() => {
    const checkIsMember = async () => {
      try {
        const result = await GroupMemberApi.isMember(user_id, group.group_id);
        console.log(result);
        if(result.success) {
          setIsMember(result.data);
        }
      } catch (error) {
        console.log(error.message || 'Error checking member in group');
        setIsMember(false);
      }
    }
    checkIsMember();
  }, []);
  
  const handleGroupJoin = async () => {
    if(group) {
      emitEvent('groupJoinRequest', group.created_by, group.group_id, user_id, name, group.group_name);
    }
  }

  const direction = useBreakpointValue({ base: 'column', md: 'row' });
  return (
    <Flex
      direction={direction}
      wrap="wrap"                 
      justify="space-between"    
      align="flex-start"         
      gap={6}                
      p={6}
    >
      
      <Box flex="1" minW="300px" masW="70%">
        {group ? (
          <Box
          w="full"
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow="md"
          rounded="lg"
          p={4}
          textAlign="left"
        >
          <DetailField field={group.group_name} label="Name" />
          <DetailField field={group.group_id} label="Id" />
          <DetailField field={group.description} label="Description" />
          <DetailField field={group.created_by} label="Creator" />
          <DetailField field={group.type} label="Type" />
          <DetailArrayField field={group.topics} label="Topics" />
          <DetailField field={group.created_at && new Date(group.created_at).toLocaleDateString()} label="Created At" />

        </Box>
        ) : (
          <CustomSpinner text="Loading..." />
        )}
      </Box>

      {/* Right Pane: Group Card */}
      <Box flex="1" minW="300px" maxW="30%">
        {group ? (
          <GroupCard 
            group={group} 
            onClick={() => {}} 
            handleJoin={handleGroupJoin}
            isUserInGroup={isMember}
          />
        ) : (
          <CustomSpinner text="Loading..." />
        )}
      </Box>
    </Flex>
  );
  
};

export default GroupDetails;