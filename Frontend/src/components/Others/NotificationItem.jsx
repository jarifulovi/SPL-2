import React, { useContext } from 'react';
import { Box, Text, Button, Flex } from '@chakra-ui/react';
import { toaster } from '../ui/toaster';
import { useColorModeValue } from '../ui/color-mode';
import { useNavigate } from 'react-router-dom';

import NotificationApi from '../../services/NotificationApi';
import GroupApi from '../../services/GroupApi';
import { SocketContext } from '../../utils/SocketContext';



const NotificationItem = ({ notification }) => {
  
  const user_id = localStorage.getItem('user_id');
  const name = localStorage.getItem('name');
  const navigate = useNavigate();
  const { onEvent, offEvent, emitEvent } = useContext(SocketContext);


  const handleAction = async (actionType) => {
    try {
      if (actionType === 'accept') {
        const groupData = await GroupApi.retrieveGroupInfo(notification.group_id);
        if (notification.type === 'join_request') {
          emitEvent('groupJoin', notification.sender, notification.group_id, 'member', name, groupData.name);
        } else if (notification.type === 'invitation' && notification.group_id) {
          emitEvent('groupJoin', user_id, notification.group_id, 'member', name, groupData.name);
        }
      }
      await NotificationApi.deleteNotification(user_id, notification.content, notification.receive_date);
      navigate(0);

    } catch (error) {
      toaster.create({
        description: error.message,
        type: 'error',
      });
    }
  };

  const bg = useColorModeValue('gray.200', 'gray.800');
  const boxShadow = useColorModeValue('md', 'lg');
  const hoverbg = useColorModeValue('gray.300', 'gray.700');
  return (
    <Box
      w="100%"
      p={2}
      bg={bg}
      borderRadius="md"
      boxShadow={boxShadow}
      mb={2}
      _hover={{ bg: hoverbg }}
    >
      <Text fontSize="md">{notification.content}</Text>
      <Text fontSize="xs" color="gray.500">{new Date(notification.receive_date).toLocaleString()}</Text>
      {(notification.type === 'join_request' || notification.type === 'invitation') && (
        <Flex mt={2} justify="space-between">
          <Button bg="green" size="sm" onClick={() => handleAction('accept')}>Accept</Button>
          <Button bg="red" size="sm" onClick={() => handleAction('reject')}>Reject</Button>
        </Flex>
      )}
    </Box>
  );
};

export default NotificationItem;