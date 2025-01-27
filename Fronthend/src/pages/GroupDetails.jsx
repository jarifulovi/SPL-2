import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Flex, Box, Text, Badge, Stack, useBreakpointValue } from "@chakra-ui/react"
import { useColorModeValue } from '../components/ui/color-mode';


import GroupCard from "../components/Others/GroupCard";
import DetailField from "../components/Fragments/DetailField";
import DetailArrayField from "../components/Fragments/DetailArrayField";
import CustomSpinner from "../components/Others/CustomSpinnner";



const GroupDetails = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const { group } = location.state || {};
  console.log(group);
  // group_name, description, created_by: creator(id), type, topics, group_id
  // created_at


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
      
      <Box flex="1" minW="300px">
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
      <Box flex="1" minW="300px">
        {group ? (
          <GroupCard group={group} onClick={() => {}} />
        ) : (
          <CustomSpinner text="Loading..." />
        )}
      </Box>
    </Flex>
  );
  
};

export default GroupDetails;