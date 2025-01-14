// ChatMessage.js
import React from 'react';
import { Box, Text, useBreakpointValue } from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';


// This will replace the user_id to name in sender and content
const ChatItem = ({ message, groupMembersMap }) => {
  
  const senderColor = useColorModeValue('white', 'black');
  const contentColor = useColorModeValue('white', 'black');
  const backgroundColor = useColorModeValue('gray.700', 'gray.300');

  const formatContent = (content) => {
    
    const userIdRegex = /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/g;
    return content.replace(userIdRegex, (userId) => groupMembersMap[userId] || userId);
  };

  return (
    <Box
      mb={2} 
      p={2}  
      borderRadius="md"
      bg={backgroundColor}
      boxShadow="sm"
    >
      <Text color={senderColor} fontSize="sm">
        {groupMembersMap[message.sender] || message.sender}
      </Text>
      <Text fontWeight="bold" color={contentColor} fontSize="sm" mt={1}>
        {formatContent(message.content)}
      </Text>
    </Box>
  );
};

export default ChatItem;