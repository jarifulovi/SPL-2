import { useState, useContext } from 'react';
import { SocketContext } from '../utils/SocketContext';



const useDiscussionData = (user_id, name, group) => {
  
  const [discussionTopic, setDiscussionTopic] = useState('');
  const [isActiveDiscussion, setActiveDiscussion] = useState(false);
  const [activeDiscTopic, setActiveDiscTopic] = useState('');
  const { emitEvent } = useContext(SocketContext);

  const handlePostDiscussion = async () => {
    if (discussionTopic.trim()) {
      console.log(discussionTopic);
      emitEvent('newDiscussion', group.group_id, user_id, name, group.group_name, discussionTopic.trim());
      setActiveDiscussion(true);
      setDiscussionTopic('');
      setActiveDiscTopic(discussionTopic);
    }
  };

  const handleCloseDiscussion = async () => {
    console.log(activeDiscTopic);
    emitEvent('closeDiscussion', group.group_id, user_id, activeDiscTopic);
    setActiveDiscTopic('');
    setActiveDiscussion(false);
  };

  const checkActiveDiscussion = (messages) => {

    for (let message of messages) {
      if (message && message.type === 'discussion_topic') {
        if (message.discussionStatus === 'open') {
          setActiveDiscussion(true);
          setActiveDiscTopic(message.topic);
          return;
        }
        if (message.discussionStatus === 'closed') {
          setActiveDiscussion(false);
          return;
        }
      }
    }
  
    // If no active discussion is found, set the state to false
    setActiveDiscussion(false);
    setActiveDiscTopic(null);
  };

  return {
    discussionTopic,
    setDiscussionTopic,
    isActiveDiscussion,
    activeDiscTopic,
    handlePostDiscussion,
    handleCloseDiscussion,
    checkActiveDiscussion
  };
};

export default useDiscussionData;