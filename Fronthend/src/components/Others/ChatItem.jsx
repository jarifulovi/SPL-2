import React from 'react';
import { Box, Text, HStack, Spacer } from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';


// This will replace the user_id to name in sender and content
const ChatItem = ({ message, groupMembersMap }) => {

  const user_id = localStorage.getItem('user_id');
  const isUserMessage = message.sender === user_id;

  const formatContent = (content) => {
    const userIdRegex = /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/g;
    return content.replace(userIdRegex, (userId) => groupMembersMap[userId] || userId);
  };

  // Format the date
  const formatDate = (date) => {
    const messageDate = new Date(date);
    return `${messageDate.getHours()}:${messageDate.getMinutes()} ${messageDate.toLocaleDateString()}`;
  };

  
  
  const senderColor = useColorModeValue('black', 'gray.200');  
  const contentColor = useColorModeValue('black', 'gray.200');  
  const backgroundColor = useColorModeValue('gray.200', 'gray.800'); 
  return (
    <Box
      mb={2}
      p={2}
      display="flex"
      justifyContent={isUserMessage ? 'flex-start' : 'flex-end'}
    >
      <Box
        maxWidth="75%"
        p={2}
        borderRadius="md"
        bg={backgroundColor}
        boxShadow="sm"
      >
        <HStack>
          <Text color={senderColor} fontSize="sm">
            {groupMembersMap[message.sender] || message.sender}
          </Text>
          <Spacer />
          <Text fontSize="xs">
            {formatDate(message.send_at)}
          </Text>
        </HStack>
        
        <Text fontWeight="bold" color={contentColor} fontSize="sm" mt={1}>
          {formatContent(message.content)}
        </Text>
      </Box>
    </Box>
  );
};

export default ChatItem;