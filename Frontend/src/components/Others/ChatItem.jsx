import React, { useState, useEffect } from 'react';
import { Box, Text, HStack, VStack, Spacer, Button, Flex, Icon, IconButton, FormatByte } from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';
import { toaster } from '../ui/toaster';
import { FiExternalLink } from 'react-icons/fi';
import { CiFileOn } from "react-icons/ci";
import { MdOutlineFileDownload } from "react-icons/md";
import CustomAvatar from './CustomAvatar';
import FileApi from '../../services/FileApi';

const FileChatItem = ({ 
  message,
  backgroundColor, 
  contentColor, 
  handleSave, 
  handleView,
  file,
}) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const buttonHoverBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box
      p={4}
      borderRadius="md"
      borderWidth="1px"
      borderColor={borderColor}
      bg={backgroundColor}
      width="100%"
      maxWidth="400px"
      boxShadow="sm"
      mt={2}
    >
      <HStack spacing={3} align="center">
        {/* <Icon size='lg'><CiFileOn /></Icon> */}
        <VStack align="start" spacing={0} flex={1}>
          <Text fontWeight="bold" color={contentColor} fontSize="sm" noOfLines={1}>
            {file.file_name}
          </Text>
          <Text color="gray.500" fontSize="xs">
            <FormatByte value={file.file_size} /> • {file.file_type}
          </Text>
        </VStack>
      </HStack>
      
      {message.content && (
        <>
          <Box 
            height="1px" 
            bg={borderColor} 
            my={2} 
            width="100%"
          />
          <Text color={contentColor} fontSize="sm">
            {message.content}
          </Text>
        </>
      )}
      
      <Flex mt={3} justify="flex-end" gap={2}>
        <IconButton 
          size="xs" 
          onClick={handleSave} 
          variant="ghost"
          colorPalette="blue"
          _hover={{ bg: buttonHoverBg }}
        >
          <MdOutlineFileDownload />
          Save
        </IconButton>
        <IconButton 
          size="xs" 
          onClick={handleView}
          variant="ghost"
          colorPalette="blue"
          _hover={{ bg: buttonHoverBg }}
        >
          <FiExternalLink />
          View
        </IconButton>
      </Flex>
    </Box>
  );
};

const ChatItem = ({ message, groupMembersMap, groupMembersProPicMap }) => {
  const user_id = localStorage.getItem('user_id');
  const isUserMessage = message.sender === user_id;
  const [file, setFile] = useState({});

  // Color tokens
  const userMessageBg = useColorModeValue('blue.50', 'blue.900');
  const otherMessageBg = useColorModeValue('gray.100', 'gray.700');
  const senderColor = useColorModeValue('gray.700', 'gray.200');
  const timestampColor = useColorModeValue('gray.500', 'gray.400');
  const contentColor = useColorModeValue('gray.800', 'white');

  const formatContent = (content) => {
    const userIdRegex = /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/g;
    return content.replace(userIdRegex, (userId) => groupMembersMap[userId] || userId);
  };

  const formatDate = (date) => {
    const messageDate = new Date(date);
    const hours = messageDate.getHours().toString().padStart(2, '0');
    const minutes = messageDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} • ${messageDate.toLocaleDateString()}`;
  };

  useEffect(() => {
    const fetchFile = async () => {
      if(!message.file_id) return;
      const result = await FileApi.retrieveFile(message.file_id);
      if(result.success) {
        setFile(result.data.file);
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
    window.open(url, '_blank');
  };

  return (
    <Flex
      m={2}
      justify={isUserMessage ? 'flex-end' : 'flex-start'}
      align="flex-start"
      gap={2}
    >
      {!isUserMessage && (
        <CustomAvatar 
          src={groupMembersProPicMap[message.sender]} 
          size="sm"
          
        />
      )}
      
      <Box
        maxWidth="75%"
        minWidth="200px"
        borderRadius="lg"
        bg={isUserMessage ? userMessageBg : otherMessageBg}
        px={2}
        py={1}
        boxShadow="sm"
        borderWidth="1px"
        borderColor={isUserMessage ? 'blue.200' : 'gray.200'}
        _dark={{
          borderColor: isUserMessage ? 'blue.700' : 'gray.600'
        }}
      >
        <HStack mb={1}>
          <Text 
            fontWeight="bold" 
            color={senderColor} 
            fontSize="xs"
          >
            {groupMembersMap[message.sender] || message.sender}
          </Text>
          <Spacer />
          <Text 
            fontSize="xs" 
            color={timestampColor}
          >
            {formatDate(message.send_at)}
          </Text>
        </HStack>
        
        {message.type === 'files' ? (
          <FileChatItem 
            message={message}
            backgroundColor={isUserMessage ? userMessageBg : otherMessageBg}
            contentColor={contentColor} 
            handleSave={handleSave} 
            handleView={handleView} 
            file={file}
          />
          
        ) : (
          <Text
            color={contentColor} 
            fontSize="sm" 
            mt={1}
            lineHeight="1.5"
          >
            {formatContent(message.content)}
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default ChatItem;