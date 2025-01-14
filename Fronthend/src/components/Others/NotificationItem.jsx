import React from 'react';
import { Box, Text, Button, Flex } from '@chakra-ui/react';

const NotificationItem = ({ type, content, receiveDate }) => {
  
    const typeColors = {
        invitation: 'blue.200',
        discussion_topic: 'green.200',
        join_request: 'yellow.200',
        join_group: 'purple.200',
        file_shared: 'orange.200',
        video_conferencing: 'red.200',
    };

    const handleAccept = () => {
        // type = join_request
        // Remove the nofitication from the list
        // Add the user to the group

        // type = invitation
        // Remove the nofitication from the list
        // Add the user to the group
    };

    const handleReject = () => {
        // Remove the nofitication from the list
    };

    return (
    <Box
      w="100%"
      p={2}
      bg={typeColors[type] || 'gray.200'}
      borderRadius="md"
      boxShadow="md"
      mb={2}
    >
      <Text fontSize="md">{content}</Text>
      <Text fontSize="xs" color="gray.500">{new Date(receiveDate).toLocaleString()}</Text>
      {(type === 'join_request' || type === 'invitation') && (
        <Flex mt={2} justify="space-between">
          <Button bg="green" size="sm">Accept</Button>
          <Button bg="red" size="sm">Reject</Button>
        </Flex>
      )}
    </Box>
  );
};

export default NotificationItem;