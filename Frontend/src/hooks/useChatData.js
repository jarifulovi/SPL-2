import { useState, useEffect, useContext } from 'react';
import GroupChatApi from '../services/GroupChatApi';
import { SocketContext } from '../utils/SocketContext';





// collect all user profile pictures
// attach them to the messages by user_id
const useChatData = (group_id, discussionHandler = null) => {
  const [messages, setMessages] = useState([]);
  const [discussionMap, setDiscussionMap] = useState({});
  const { onEvent, offEvent, emitEvent } = useContext(SocketContext);

  const formatMessageArray = (messages) => {
    
  
    const formattedMessages = [];
    const newDiscussionMap = {};
  
    // First pass: identify discussions and create empty arrays for them
    messages.forEach((message) => {
      if (message.discussionStatus === "open") {
        newDiscussionMap[message.chat_id] = [];
      }
    });
    
    // Second pass: organize messages into discussions or main list
    messages.forEach((message) => {
      if (message.discussionStatus === "open") {
        formattedMessages.push(message);
      } else if (message.discussion_id && newDiscussionMap[message.discussion_id]) {
        newDiscussionMap[message.discussion_id].unshift(message);
      } else {
        formattedMessages.push(message);
      }
    });
    
    setMessages(formattedMessages);
    setDiscussionMap(newDiscussionMap);
  };

  const retAndUpdateChats = async (group_id) => {
    try {
      const result = await GroupChatApi.retrieveAllChats(group_id);
      formatMessageArray(result.data);
      return result.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const sendChatMessage = (group_id, user_id, message, additionalData = {}) => {
    if (message.trim()) {
      emitEvent('chatMessage', group_id, user_id, message.trim(), 'text_message', additionalData);
    }
  };

  useEffect(() => {
    if (group_id) {
      retAndUpdateChats(group_id);
    }
  }, [group_id]);

  useEffect(() => {
    const handleNewChatMessage = (newMessage) => {
      // If a discussion handler was provided, process the message through it first
      if (discussionHandler) {
        discussionHandler(newMessage);
      }

      // Process the message based on its type
      if (newMessage.type === 'discussion_topic') {
        if (newMessage.discussionStatus === 'open') {
          setMessages(prevMessages => [newMessage, ...prevMessages]);
          setDiscussionMap(prevMap => ({
            ...prevMap,
            [newMessage.chat_id]: []
          }));
        }
      } else if (newMessage.discussion_id) {
        // Message belongs to a discussion
        setDiscussionMap(prevMap => {
          if (!prevMap[newMessage.discussion_id]) return prevMap;
          
          return {
            ...prevMap,
            [newMessage.discussion_id]: [newMessage, ...prevMap[newMessage.discussion_id]]
          };
        });
      } else {
        // Regular message
        setMessages(prevMessages => [newMessage, ...prevMessages]);
      }
    };

    onEvent('chatMessage', handleNewChatMessage);

    return () => {
      offEvent('chatMessage', handleNewChatMessage);
    };
  }, [onEvent, offEvent, discussionHandler]);

  return { 
    messages, 
    setMessages, 
    discussionMap,
    retAndUpdateChats, 
    sendChatMessage 
  };
};

export default useChatData;