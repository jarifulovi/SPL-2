import { useContext, useEffect, useState, useRef } from 'react';
import { Box, HStack, Flex, VStack, Text, Button, Input } from '@chakra-ui/react';

import GroupItem from '../components/Others/GroupItem';
import ChatItem from '../components/Others/ChatItem';

import GroupMemberApi from '../services/GroupMemberApi';
import GroupChatApi from '../services/GroupChatApi';
import { SocketContext } from '../utils/SocketContext';

const tolerance = 2;  // For checking scroll bottom


const retAndUpdateGroups = async (user_id, setGroupsData) => {
  try {
    const result = await GroupMemberApi.getAllGroupsOfMember(user_id);
    setGroupsData(result.data || []);
    return result.data;
  } catch (error) {
    console.log(error.message);
  }
};

const retAndUpdateChats = async (group_id, setMessages) => {
  try {
    const result = await GroupChatApi.retrieveAllChats(group_id);
    setMessages(result.data || []);
    return result.data;
  } catch (error) {
    console.log(error.message);
  }
};

const retAndUpdateGroupMembers = async (group_id, setGroupMembersMap, currentUserId, setIsAdmin) => {
  try {
    const result = await GroupMemberApi.getAllGroupMembers(group_id);
    const membersMap = result.data.reduce((acc, member) => {
      acc[member.user_id] = member.name;
      return acc;
    }, {});
    setGroupMembersMap(membersMap || {});
    

    // Check if the current user is an admin
    const currentUser = result.data.find(member => member.user_id === currentUserId);
    if (currentUser && currentUser.role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }

    return membersMap;
  } catch (error) {
    console.log(error.message);
  }
};



const GroupChatPage = () => {

  
  // State to hold the list of groups the user is a member of
  const [groupsData, setGroupsData] = useState([]);

  // State to track the currently selected group
  const [selectedGroup, setSelectedGroup] = useState(null);

  // State to store a map of selected group's members' user IDs to their names
  const [groupMembersMap, setGroupMembersMap] = useState({});

  // State to hold the list of messages for the selected group
  const [messages, setMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState('');

  // Check if user is admin in the selected group
  const [isAdmin, setIsAdmin] = useState(false);

  // Reference to the chat container element, used for scrolling control
  const chatContainerRef = useRef(null);

  // Reference to track whether the chat container is scrolled to the bottom
  const [isAtBottom, setIsAtBottom] = useState(true);



  const user_id = localStorage.getItem('user_id');
  const name = localStorage.getItem('name');
  
  const { onEvent, emitEvent } = useContext(SocketContext);


  // Fetch data when the component mounts
  useEffect(() => {
    const fetchGroups = async () => {
      const data = await retAndUpdateGroups(user_id, setGroupsData);
      
      if (data && data.length > 0) {

        // Select default group
        setSelectedGroup(data[0]); 
        await retAndUpdateChats(data[0].group_id, setMessages); 
        await retAndUpdateGroupMembers(data[0].group_id, setGroupMembersMap, user_id, setIsAdmin);
      }
    };
    fetchGroups();
  }, [user_id, setGroupsData, setMessages, setGroupMembersMap]);

  // Listening for new chat messages
  useEffect(() => {
    const handleNewChatMessage = (newMessage) => {
      setMessages((prevMessages) => {
        // Check if the new message is already in the messages list
        const isDuplicate = prevMessages.some(
          (msg) => msg.chat_id === newMessage.chat_id
        );
        
        if (!isDuplicate) {
          return [newMessage, ...prevMessages];
        }
        
        return prevMessages;
      });
    };
  
    onEvent('chatMessage', handleNewChatMessage);
  
    
    return () => {
      
    };
  }, [onEvent]);
  


  // When a group is clicked
  const onSelectGroup = async (group) => {
    setSelectedGroup(group);
    console.log('Group : ', group.group_name, " is selected");

    await retAndUpdateChats(group.group_id, setMessages);
    await retAndUpdateGroupMembers(group.group_id, setGroupMembersMap, user_id, setIsAdmin);
  };


  // Function to handle sending the message
  const sendChatMessage = async () => {
    if (sendMessage.trim()) {
      emitEvent('chatMessage', selectedGroup.group_id, user_id, sendMessage.trim());
      setSendMessage('');
    }
  };


  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const atBottom = Math.abs(scrollHeight - scrollTop - clientHeight) <= tolerance;
      setIsAtBottom(atBottom);
    }
  };
  
  
  

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom]); 


  return (
    <Flex height="100%">
      {/* Left Panel: Group List */}
      <Box 
        width={{ base: '100%', md: '30%' }} 
        p={4} 
        boxShadow="md" 
        overflowY="auto"
      >
        <VStack spacing={4} align="stretch">
        {groupsData.length > 0 ? (
            groupsData.map((group) => (
              <GroupItem
                key={group.group_id}
                group={group}
                selectedGroup={selectedGroup}
                onSelectGroup={onSelectGroup}
                isAdmin={isAdmin}
              />
            ))
          ) : (
            <Text>No groups available</Text>
          )}
        </VStack>
      </Box>

      {/* Right Panel: Chat */}
      <Box 
        width={{ base: '100%', md: '70%' }} 
        p={4} 
        boxShadow="md"
        display="flex"
        flexDirection="column"
      >
        {/* Chat Messages */}
        <Box
        ref={chatContainerRef}
        flex="1"
        overflowY="auto"
        mb={4}
        display="flex"
        flexDirection="column"
        onScroll={handleScroll} // Listen to scroll events
        >
        {messages.length > 0 ? (
          messages.slice().reverse().map((msg, index) => (
            <ChatItem key={msg.chat_id} message={msg} groupMembersMap={groupMembersMap} />
          ))
        ) : (
          <Text>No messages yet</Text>
        )}


      </Box>

        <HStack>
        <Input 
            variant="subtle" 
            placeholder="Type a message..." 
            value={sendMessage}
            onChange={(e) => setSendMessage(e.target.value)}
          />
          <Button onClick={sendChatMessage}>
            Send
          </Button>
        </HStack>
      
      </Box>
    </Flex>
  );
};

export default GroupChatPage;
