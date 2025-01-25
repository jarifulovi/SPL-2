import React from 'react';
import { Box, Text, Button, Flex } from '@chakra-ui/react';
import { toaster, Toaster } from '../ui/toaster';
import { useNavigate } from 'react-router-dom';

import NotificationApi from '../../services/NotificationApi';
import GroupMemberApi from '../../services/GroupMemberApi';



const NotificationItem = ({ notification }) => {
  
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate();

  const typeColors = {
      invitation: 'blue.200',
      discussion_topic: 'green.200',
      join_request: 'yellow.200',
      join_group: 'purple.200',
      file_shared: 'orange.200',
      video_conferencing: 'red.200',
  };

  const handleAction = async (actionType) => {
    try {
      if (actionType === 'accept') {
        if (notification.type === 'join_request') {
          await GroupMemberApi.addMember(notification.sender, notification.group_id);
        } else if (notification.type === 'invitation' && notification.group_id) {
          await GroupMemberApi.addMember(user_id, notification.group_id);
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

  return (
    <Box
      w="100%"
      p={2}
      //bg={typeColors[type] || 'gray.200'}
      borderRadius="md"
      boxShadow="md"
      mb={2}
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