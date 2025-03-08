import React from 'react';
import { HStack, Box, Button, IconButton, Text, Spacer } from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { toaster } from '../ui/toaster';

import PopOver from '../Buttons/PopOver';
import DropDown from '../Buttons/DropDown';

import GroupMemberApi from '../../services/GroupMemberApi';




// Here group is the json obj of group model
const GroupItem = ({ group, selectedGroup, onSelectGroup, isAdmin = false }) => {

  const contentColor = useColorModeValue('white', 'white');
  const backgroundColor = useColorModeValue('gray.800', 'gray.700');
  const gradientColor = "linear-gradient(45deg, #56d8e4, #4050dc)";
  const selectedGradientColor = "linear-gradient(45deg, #3baacb,rgb(39, 48, 127))";
  const user_id = localStorage.getItem('user_id');

  const navigate = useNavigate();


  const handleGroupDetails = () => {
    navigate("/groupDetails", {
      state: {
        group,
      },
    });
  };

  const handleGroupOptions = () => {
    // admin page for groups
    navigate("/groupOptions", {
      state: {
        group,
      }
    });
  };


  const handleLeaveGroup = async () => {
    console.log('leave');
    try {
      const result = await GroupMemberApi.removeMember(user_id, group.group_id);

      if(result.success) {
        navigate(0);
      }
    } catch (error) {
      toaster.create({
        description: error.message,
        type: "error",
      });
    }
  };


  const menuItems = [
    { value: "details", label: "Details", onClick: handleGroupDetails },
    { value: "leave", label: "Leave Group", onClick: handleLeaveGroup, isDanger: true },
  ];
  
  const menuItemForAdmin = [
    { value: "details", label: "Details", onClick: handleGroupDetails },
    { value: "options", label: "Options", onClick: handleGroupOptions },
  ]
  

  return (
    <Box
      as="div"
      bg={selectedGroup.group_id === group.group_id ? selectedGradientColor : backgroundColor}
      borderRadius="md"
      mb={2}
      cursor="pointer"
      onClick={() => onSelectGroup(group)} 
      _hover={{ bg: gradientColor}}
    >
      <HStack p={2}>
        <Text   fontWeight="semibold" color={contentColor}>{group.group_name}</Text>
        <Spacer></Spacer>

        <DropDown 
          trigger={
            <IconButton bg="transparent"
            onClick={(e) => {
              e.stopPropagation()
            }}
          > 
            <PiDotsThreeOutlineVertical />
          </IconButton>
          } 
          menuItems={isAdmin ? menuItemForAdmin : menuItems}
        
        />
      </HStack>
    
    </Box>
  );
};

export default GroupItem;
