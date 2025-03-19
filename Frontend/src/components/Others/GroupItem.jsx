import React from 'react';
import { HStack, Box, IconButton, Text, Spacer, useToken } from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { toaster } from '../ui/toaster';

import DropDown from '../Buttons/DropDown';
import CustomAvatar from './CustomAvatar';

import GroupMemberApi from '../../services/GroupMemberApi';




// Here group is the json obj of group model
const GroupItem = ({ group, selectedGroup, onSelectGroup, isAdmin = false }) => {
  const contentColor = useColorModeValue('gray.100', 'gray.100');
  const backgroundColor = useColorModeValue('gray.700', 'gray.800');
  const hoverBg = useColorModeValue('gray.600', 'gray.700');
  const selectedBg = useColorModeValue('blue.600', 'blue.700');
  const iconColor = useColorModeValue('gray.300', 'gray.400');
  
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate();

  const handleGroupDetails = () => {
    navigate(`/groupDetails/${group.group_id}`);
  };

  const handleGroupOptions = () => {
    navigate(`/groupOptions/${group.group_id}`);
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
  ];

  const isSelected = selectedGroup.group_id === group.group_id;

  return (
    <Box
      position="relative"
      bg={isSelected ? selectedBg : backgroundColor}
      borderRadius="lg"
      mb={2}
      cursor="pointer"
      onClick={() => onSelectGroup(group)}
      transition="all 0.2s"
      _hover={{
        bg: isSelected ? selectedBg : hoverBg,
        transform: 'translateX(4px)',
      }}
      boxShadow={isSelected ? 'lg' : 'sm'}
    >
      <HStack 
        p={3} 
        spacing={4}
        align="center"
      >
        <CustomAvatar
          src={group.group_image}
          size='sm'
        />
        <Box flex="1">
          <Text 
            fontWeight="semibold" 
            color={contentColor}
            fontSize="md"
            noOfLines={1}
          >
            {group.group_name}
          </Text>
          {group.role === 'admin' && (
            <Text 
              fontSize="xs" 
              color={iconColor}
              mt={0.5}
            >
              Admin
            </Text>
          )}
        </Box>
        <Box>
          <DropDown 
            trigger={
              <IconButton
                size="lg"
                bg="transparent"
                color={iconColor}
                _focus={{ outline: "none", boxShadow: "none" }}
                _hover={{ bg: 'transparent', color: contentColor }}
                _active={{ bg: 'transparent' }}
                onClick={(e) => e.stopPropagation()}
                aria-label="Group settings"
              >
                <IoSettingsOutline />
              </IconButton>
            } 
            menuItems={group.role === 'admin' ? menuItemForAdmin : menuItems}
          />
        </Box>
      </HStack>
    </Box>
  );
};

export default GroupItem;
