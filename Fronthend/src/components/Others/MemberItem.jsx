import React from 'react';
import { HStack, Box, Button, IconButton, Text, Spacer } from '@chakra-ui/react';
import CustomAvatar from './CustomAvatar';
import { useColorModeValue } from '../ui/color-mode';
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { toaster } from '../ui/toaster';

// param : member { user_id, name, email, profile_pic }

const MemberItem = ({ member = {}, onSelectMember = ()=>{} }) => {

  const gradientColor = "linear-gradient(45deg, #56d8e4, #4050dc)";

  return (
    <Box
      as="div"
      borderRadius="md"
      width="100%"
      mb={2}
      cursor="pointer"
      onClick={() => onSelectMember(member)} 
      _hover={{ bg: gradientColor}}
    >
      <HStack p={2}>
        <CustomAvatar size="sm" src={member.profile_pic}/>
        <Text fontWeight="semibold">{member.name}</Text>
        <Spacer></Spacer>
        <Text>{member.email}</Text>
      </HStack>
    </Box>
  );
};

export default MemberItem;