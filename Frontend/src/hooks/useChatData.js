import { useState, useEffect, useContext } from 'react';
import GroupChatApi from '../services/GroupChatApi';
import { SocketContext } from '../utils/SocketContext';



const useChatData = (group_id) => {
  const [messages, setMessages] = useState([]);
  const { onEvent, offEvent, emitEvent } = useContext(SocketContext);

  const retAndUpdateChats = async (group_id) => {
    try {
      const result = await GroupChatApi.retrieveAllChats(group_id);
      setMessages(result.data || []);
      return result.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const sendChatMessage = (group_id, user_id, message) => {
    if (message.trim()) {
      emitEvent('chatMessage', group_id, user_id, message.trim());
    }
  };

  useEffect(() => {
    if (group_id) {
      retAndUpdateChats(group_id);
    }
  }, [group_id]);

  useEffect(() => {
    const handleNewChatMessage = (newMessage) => {
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
    };

    onEvent('chatMessage', handleNewChatMessage);

    return () => {
      offEvent('chatMessage', handleNewChatMessage);
    };
  }, [onEvent, offEvent]);

  return { messages, setMessages, retAndUpdateChats, sendChatMessage };
};

export default useChatData;