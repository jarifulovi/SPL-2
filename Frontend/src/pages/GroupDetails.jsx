import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react"
import { Flex, Box, Text, useBreakpointValue, VStack } from "@chakra-ui/react"
import { useColorModeValue } from '../components/ui/color-mode';


import GroupCard from "../components/Others/GroupCard";
import DetailField from "../components/Fragments/DetailField";
import DetailArrayField from "../components/Fragments/DetailArrayField";
import MemberItem from "../components/Others/MemberItem";
import CustomSpinner from "../components/Others/CustomSpinnner";

import CompositeApi from '../services/CompositeApi';
import { SocketContext } from '../utils/SocketContext';
import GroupApi from "../services/GroupApi";

// Collaborators
// **************
// Admin ( all details + admin extra ) ( extra admin details doesn't exists now )
// Members ( all details )
// Non-Members ( add join button + basic info )
// Unregistered users ( basic info )
// ***************


const GroupDetails = () => {
  const { id: group_id } = useParams();
  const user_id = localStorage.getItem('user_id');
  const name = localStorage.getItem('name');
  const { emitEvent } = useContext(SocketContext);
  const direction = useBreakpointValue({ base: 'column', md: 'row' });
  const boxBgColor = useColorModeValue('white', 'gray.800');

  const [groupData, setGroupData] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [creator_name, setCreatorName] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);

  useEffect(() => {
    const load = async () => {
      if (!group_id) return;
      console.log("id", group_id);

      try {
        const result1 = await GroupApi.retrieveGroupInfo(group_id);
        setGroupData(result1.data);
        
        if (result1.success && user_id) {
          const result2 = await CompositeApi.loadGroupDetails(user_id, result1.data);
          if(result2.success) {
            setIsMember(result2.data?.isMember);
            setCreatorName(result2.data?.creator_name);
            setGroupMembers(result2.data?.groupMembers);
          }
        }
      } catch (error) {
        console.error('Error loading group details:', error.message);
        setIsMember(false);
        setCreatorName('');
        setGroupMembers([]);
      }
    }
    
    load();
  }, [group_id, user_id]);
  
  const handleGroupJoin = async () => {
    if(groupData && user_id) {
      // created_by is the admin
      emitEvent('groupJoinRequest', groupData.created_by, groupData.group_id, user_id, name, groupData.group_name);
    }
  }

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
        {groupData ? (
          <>
            <Box
              w="full"
              bg={boxBgColor}
              boxShadow="md"
              rounded="lg"
              p={4}
              textAlign="left"
              mb={6}
            >
              <DetailField field={groupData.group_name} label="Name" />
              <DetailField field={groupData.group_id} label="Id" />
              <DetailField field={groupData.group_description} label="Description" />
              <DetailField field={creator_name} label="Creator" />
              <DetailField field={groupData.type} label="Type" />
              <DetailArrayField field={groupData.topics} label="Topics" />
              <DetailField field={groupData.created_at && new Date(groupData.created_at).toLocaleDateString()} label="Created At" />
            </Box>
            <Box
              w="full"
              bg={boxBgColor}
              boxShadow="md"
              rounded="lg"
              p={4}
              textAlign="left"
            >
              <Text fontSize="lg" fontWeight="bold" mb={4}>
                Members
              </Text>
              {groupMembers && groupMembers.length > 0 ? (
                <VStack>
                  {groupMembers.map((member, index) => (
                    <MemberItem key={index} member={member} />
                  ))}
                </VStack>
              ) : null}
            </Box>
          </>
        ) : (
          <CustomSpinner text="Loading..." />
        )}
      </Box>

      {/* Right Pane: Group Card */}
      <Box flex="1" minW="300px" maxW="30%">
        {groupData ? (
          <GroupCard 
            group={groupData} 
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