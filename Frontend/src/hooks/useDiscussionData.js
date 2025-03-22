import { useState, useContext, useEffect, useCallback } from 'react';
import { SocketContext } from '../utils/SocketContext';

const useDiscussionData = (user_id, name, group) => {
  const [discussionTopic, setDiscussionTopic] = useState('');
  const [isActiveDiscussion, setActiveDiscussion] = useState(false);
  const [activeDiscussionId, setActiveDiscussionId] = useState('');
  const [activeDiscTopic, setActiveDiscTopic] = useState('');
  const { emitEvent, onEvent, offEvent } = useContext(SocketContext);

  const handlePostDiscussion = async () => {
    if (discussionTopic.trim()) {
      console.log(discussionTopic);
      emitEvent('newDiscussion', group.group_id, user_id, name, group.group_name, discussionTopic.trim());
      setDiscussionTopic('');
    }
  };

  const handleCloseDiscussion = async () => {
    console.log(activeDiscTopic);
    emitEvent('closeDiscussion', group.group_id, user_id, activeDiscTopic);
    setActiveDiscTopic('');
  };

  // invokes initially
  const checkActiveDiscussion = (messages) => {
    if (!messages) return;
    
    for (let message of messages) {
      if (message && message.type === 'discussion_topic') {
        if (message.discussionStatus === 'open') {
          setActiveDiscussion(true);
          setActiveDiscTopic(message.topic);
          setActiveDiscussionId(message.chat_id);
          return;
        }
        if (message.discussionStatus === 'closed') {
          setActiveDiscussion(false);
          setActiveDiscTopic(null);
          setActiveDiscussionId(null);
          return;
        }
      }
    }
  
    // If no active discussion is found, set the state to false
    setActiveDiscussion(false);
    setActiveDiscTopic(null);
    setActiveDiscussionId(null);
  };

  // Define a handler function that can be passed to useChatData
  // Using useCallback to prevent unnecessary recreations
  const handleNewMessage = useCallback((message) => {
    if (message.type === 'discussion_topic') {
      if (message.discussionStatus === 'open') {
        setActiveDiscussion(true);
        setActiveDiscTopic(message.topic);
        setActiveDiscussionId(message.chat_id);
      } else if (message.discussionStatus === 'closed') {
        setActiveDiscussion(false);
        setActiveDiscTopic(null);
        setActiveDiscussionId(null);
      }
    }
  }, []);

  // We no longer need this useEffect since we'll handle it through useChatData
  // But we'll keep it as a fallback for direct socket events not through useChatData
  useEffect(() => {
    onEvent('chatMessage', handleNewMessage);

    return () => {
      offEvent('chatMessage', handleNewMessage);
    };
  }, [onEvent, offEvent, handleNewMessage]);

  return {
    discussionTopic,
    setDiscussionTopic,
    isActiveDiscussion,
    activeDiscTopic,
    activeDiscussionId,
    handlePostDiscussion,
    handleCloseDiscussion,
    checkActiveDiscussion,
    handleNewMessage // Export the handler for useChatData
  };
};

export default useDiscussionData;