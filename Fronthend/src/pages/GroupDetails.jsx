import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react"
import { Button } from "../components/ui/button"
import { Flex, Box, Text, Badge, Stack, useBreakpointValue, HStack, VStack } from "@chakra-ui/react"
import { useColorModeValue } from '../components/ui/color-mode';


import GroupCard from "../components/Others/GroupCard";
import DetailField from "../components/Fragments/DetailField";
import DetailArrayField from "../components/Fragments/DetailArrayField";
import MemberItem from "../components/Others/MemberItem";
import CustomDialog from "../components/Buttons/CustomDialog";
import CustomSpinner from "../components/Others/CustomSpinnner";

import GroupMemberApi from '../services/GroupMemberApi';
import CompositeApi from "../services/compositeApi";
import { SocketContext } from '../utils/SocketContext';


// Needs: creator name, group members, isCurrentUser a member

const GroupDetails = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { group } = location.state || {};
  const user_id = localStorage.getItem('user_id');
  const name = localStorage.getItem('name');
  const { onEvent, offEvent, emitEvent } = useContext(SocketContext);


  const [ isMember, setIsMember ] = useState(false);
  const [ creator_name, setCreatorName ] = useState('');
  const [ groupMembers, setGroupMembers ] = useState([]);
  

  useEffect(() => {
    const checkIsMember = async () => {
      try {
        const result = await CompositeApi.loadGroupDetails(user_id, group);
        console.log(result.data.groupMembers);
        if(result.success) {
          setIsMember(result.data?.isMember);
          setCreatorName(result.data?.creator_name);
          setGroupMembers(result.data?.groupMembers);
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
      // created_by is the admin
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
          <>
          <Box
          w="full"
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow="md"
          rounded="lg"
          p={4}
          textAlign="left"
          mb={6}
          >
            <DetailField field={group.group_name} label="Name" />
            <DetailField field={group.group_id} label="Id" />
            <DetailField field={group.group_description} label="Description" />
            <DetailField field={creator_name} label="Creator" />
            <DetailField field={group.type} label="Type" />
            <DetailArrayField field={group.topics} label="Topics" />
            <DetailField field={group.created_at && new Date(group.created_at).toLocaleDateString()} label="Created At" />

          </Box>
          <Box
            w="full"
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow="md"
            rounded="lg"
            p={4}
            textAlign="left"
          >
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Members
            </Text>
            <VStack>
              {groupMembers.map((member, index) => (
                <MemberItem key={index} member={member} />
              ))}
            </VStack>

          </Box>
          </>
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