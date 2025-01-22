import React from 'react';
import { Box, Text, Button, Flex } from '@chakra-ui/react';
import { toaster, Toaster } from '../ui/toaster';
import { useNavigate } from 'react-router-dom';

import NotificationApi from '../../services/NotificationApi';
import GroupMemberApi from '../../services/GroupMemberApi';


const handleRemoveNotif = async (user_id, content, receive_date, navigate) => {
  try {
    const result = await NotificationApi.deleteNotification(user_id, content, receive_date);
    if(result.success) {
      // reload page
      navigate(0);
    }
  } catch (error) {
    toaster.create({
      description: error.message,
      type: "error"
    });
  }
}

const handleAddMember = async (user_id, group_id, navigate) => {
  try {
    const result = await GroupMemberApi.addMember(user_id, group_id);
    if(result.success) {
      console.log('Member added to group');
    }
  } catch (error) {
    toaster.create({
      description: error.message,
      type: "error"
    });
  }
}


const NotificationItem = ({ type, content, receiveDate, group_id = '' }) => {
  
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

  const handleAccept = async () => {
      // type = join_request
      // Remove the nofitication from the list
      // Add the user to the group
      if(type === 'join_request') {

      }

      // type = invitation
      // Remove the nofitication from the list
      // Add the user to the group
      if(type === 'invitation' && group_id) {
        await handleAddMember(user_id, group_id);
        await handleRemoveNotif(user_id, content, receiveDate, navigate);
      }
      
  };

  const handleReject = async () => {
    await handleRemoveNotif(user_id, content, receiveDate, navigate);
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
      <Text fontSize="md">{content}</Text>
      <Text fontSize="xs" color="gray.500">{new Date(receiveDate).toLocaleString()}</Text>
      {(type === 'join_request' || type === 'invitation') && (
        <Flex mt={2} justify="space-between">
          <Button bg="green" size="sm" onClick={handleAccept}>Accept</Button>
          <Button bg="red" size="sm" onClick={handleReject}>Reject</Button>
        </Flex>
      )}
    </Box>
  );
};

export default NotificationItem;