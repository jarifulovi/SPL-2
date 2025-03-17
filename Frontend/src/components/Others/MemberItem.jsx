import React from 'react';
import { HStack, Box, Button, IconButton, Text, Spacer, Badge } from '@chakra-ui/react';
import CustomAvatar from './CustomAvatar';
import { useColorModeValue } from '../ui/color-mode';
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { toaster } from '../ui/toaster';

// param : member { user_id, name, email, profile_pic }

const onSelectMember = (member, navigate) => {
  
  const currentUserId = localStorage.getItem('user_id');
  const profileUserId = member.user_id;

  if(currentUserId === profileUserId) {
    navigate("/profile");
  } else {
    navigate(`/othersProfile/${profileUserId}`, {
      state: { profileUserId },
    });
  }
  
}

const MemberItem = ({ member = {} }) => {

  const gradientColor = "linear-gradient(45deg, #56d8e4, #4050dc)";
  const navigate = useNavigate();

  return (
    <Box
      as="div"
      borderRadius="md"
      width="100%"
      mb={2}
      cursor="pointer"
      onClick={() => onSelectMember(member, navigate)} 
      _hover={{ bg: gradientColor}}
    >
      <HStack p={2}>
        <CustomAvatar size="sm" src={member.profile_picture}/>
        <Text fontWeight="semibold">{member.name}</Text>
        {member?.role === 'admin' && <Badge>Admin</Badge>}

        
        <Spacer></Spacer>
        <Text>{member.email}</Text>
      </HStack>
    </Box>
  );
};

export default MemberItem;