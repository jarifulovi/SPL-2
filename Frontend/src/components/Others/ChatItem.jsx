import React from 'react';
import { Box, Text, HStack, VStack, Spacer, Button, Icon } from '@chakra-ui/react';
import { CiFileOn } from "react-icons/ci";
import { useColorModeValue } from '../ui/color-mode';

// fetch the file using message.file_id
// display file name, size, mimetype, date
// attack two buttons, save and view
// save will save the file in user repo
// view will ope the file in new tab


const FileChatItem = ({ message, backgroundColor, contentColor, handleSave, handleView }) => {
  return (
    <Box
      p={3}
      borderRadius="md"
      bg={backgroundColor}
      width="fit-content"
      minWidth="250px"
      maxWidth="400px"
      boxShadow="sm"
    >
      <HStack alignItems="center">
        
        <VStack align="start" spacing={0} flex={1}>
          <Text fontWeight="bold" color={contentColor} fontSize="sm" noOfLines={1}>
            {'message.file_name'}
          </Text>
          <Text color={contentColor} fontSize="xs">
            {'message.size'} - {'message.mimetype'}
          </Text>
        </VStack>
      </HStack>
      {message.content && (
        <Text color={contentColor} fontSize="sm" mt={2}>
          {message.content}
        </Text>
      )}
      <HStack mt={3} spacing={2} justifyContent="flex-end">
        <Button size="xs" onClick={handleSave} variant="ghost">
          Save
        </Button>
        <Button size="xs" onClick={handleView}>
          View
        </Button>
      </HStack>
    </Box>
  );
};


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

  const handleSave = () => {
    // Implement save logic here
    console.log('Save file');
  };

  const handleView = () => {
    // Implement view logic here
    // window.open(message.file_url, '_blank');
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
        {message.type === 'files' ? (
          <FileChatItem 
            message={message}
            backgroundColor={backgroundColor}
            contentColor={contentColor} 
            handleSave={handleSave} 
            handleView={handleView} 
          />
        ) : (
          <Text fontWeight="bold" color={contentColor} fontSize="sm" mt={1}>
            {formatContent(message.content)}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default ChatItem;