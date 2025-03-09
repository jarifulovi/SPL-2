import React, { useState, useEffect } from 'react';
import { Box, Text, HStack, VStack, Spacer, Button, Icon } from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';
import { toaster } from '../ui/toaster';

import FileApi from '../../services/FileApi';



const FileChatItem = ({ 
  message, 
  backgroundColor, 
  contentColor, 
  handleSave, 
  handleView,
  file,
}) => {
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
            {file.file_name}
          </Text>
          <Text color={contentColor} fontSize="xs">
            {file.file_size < 1024 ? `${file.file_size} Bytes` 
            : `${(file.file_size / 1024).toFixed(2)} KB`} - {file.file_type}

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
  const [file, setFile] = useState({});

  const formatContent = (content) => {
    const userIdRegex = /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/g;
    return content.replace(userIdRegex, (userId) => groupMembersMap[userId] || userId);
  };

  // Format the date
  const formatDate = (date) => {
    const messageDate = new Date(date);
    return `${messageDate.getHours()}:${messageDate.getMinutes()} ${messageDate.toLocaleDateString()}`;
  };


  useEffect(() => {
    
    const fetchFile = async () => {
      if(!message.file_id) return;
      const result = await FileApi.retrieveFile(message.file_id);
      if(result.success) {
        setFile(result.data.file);
        //console.log(result.data.file);
      }
      else {
        toaster.create({
          type: 'error',
          description: result.message || 'Error fetching file data'
        });
      }
    }

    fetchFile();
    
  }, [message.file_id]);

  const handleSave = async () => {
    
    if(!message.file_id) {
      console.log('No file id');
      return;
    }
    try {
      const result = await FileApi.retrieveFile(message.file_id);
      const result2 = await FileApi.saveFile(user_id, result.data.file);
      
      if(result2.success) {
        toaster.create({
          type: 'success',
          description: 'File saved successfully.',
        });
      } else {
        toaster.create({
          type: 'error',
          description: result2.message,
        });
      }
    } catch (error) {
      toaster.create({
        type: 'error',
        description: error.message,
      });
    }
    
  };

  const handleView = async () => {
    if(!message.file_id) {
      console.log('No file id');
      return;
    }
    const result = await FileApi.getFileUrl(message.file_id);
    const url = result.data.fileUrl;
    console.log(result.data.fileUrl);
    window.open(url, '_blank');
    
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
            file={file}
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