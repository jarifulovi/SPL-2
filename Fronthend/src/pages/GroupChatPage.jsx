import { useEffect, useState } from 'react';
import { Box, HStack, Flex, VStack, Text, IconButton, Input } from '@chakra-ui/react';
import { Button } from '../components/ui/button';
import GroupItem from '../components/Others/GroupItem';
import ChatItem from '../components/Others/ChatItem';
import CustomDialog from '../components/Buttons/CustomDialog';
import UploadFile from '../components/Others/UploadFile';
import { HiUpload } from "react-icons/hi"

// Context and hooks
import useGroupData from '../hooks/useGroupData';
import useChatData from '../hooks/useChatData';
import useGroupMembers from '../hooks/useGroupMembers';
import useDiscussionData from '../hooks/useDiscussionData';
import useFileUpload from '../hooks/useFileUpload';
import useScroll from '../hooks/useScroll';



const GroupChatPage = () => {

  const user_id = localStorage.getItem('user_id');
  const name = localStorage.getItem('name');
  
  // States of hooks
  const {groupsData, selectedGroup, setSelectedGroup} = useGroupData(user_id);
  const { groupMembersMap, isAdmin, retAndUpdateGroupMembers } = useGroupMembers(selectedGroup?.group_id, user_id);
  const { 
    messages, 
    setMessages, 
    retAndUpdateChats, 
    sendChatMessage 
  } = useChatData(selectedGroup?.group_id);

  const [sendMessage, setSendMessage] = useState('');
  const {
    fileDescription,
    setFileDescription,
    setFileUpload,
    onClearFile,
    handleFileUpload,
    accepts,
  } = useFileUpload();

  const { containerRef, handleScroll } = useScroll([messages]);
  
  const {
    discussionTopic,
    isActiveDiscussion,
    setDiscussionTopic,
    handlePostDiscussion,
    handleCloseDiscussion,
    checkActiveDiscussion,
  } = useDiscussionData(user_id, name, selectedGroup);



  // Fetch data when the component mounts
  useEffect(() => {
    const fetchGroups = async () => {
      
      if (groupsData && groupsData.length > 0) {
        // Select default group
        console.log(groupsData);
        const initialMessages = await retAndUpdateChats(groupsData[0].group_id); 
        await retAndUpdateGroupMembers(groupsData[0].group_id);
        checkActiveDiscussion(initialMessages);
      }
    };
    fetchGroups();
  }, [user_id, groupsData, setMessages]);




  // When a group is clicked
  const onSelectGroup = async (group) => {
    setSelectedGroup(group);
    console.log('Group : ', group.group_name, " is selected");

    const updatedMessages = await retAndUpdateChats(group.group_id);
    await retAndUpdateGroupMembers(group.group_id);
    checkActiveDiscussion(updatedMessages);
  };


  // Function to handle sending the message
  const handleSendMessage = async () => {
    if (groupsData.length > 0) {
      sendChatMessage(selectedGroup.group_id, user_id, sendMessage);
      setSendMessage('');
    }
  };

  



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
        ref={containerRef}
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

        <HStack width="100%">
          <Input 
              flex="1"
              variant="subtle" 
              placeholder="Type a message..." 
              value={sendMessage}
              onChange={(e) => setSendMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
           
            <CustomDialog
              triggerButton={<Button colorPalette="purple"><HiUpload /></Button>}
              dialogTitle='Upload a file'
              dialogBody={
                <VStack>
                <UploadFile 
                  accepts={accepts}
                  onSetFile={setFileUpload}
                  onClearFile={onClearFile}
                />
                <Input 
                    value={fileDescription} 
                    onChange={(e) => setFileDescription(e.target.value)}
                    placeholder='File description...'
                />
                </VStack>
              }
              confirmButtonText='Upload'
              confirmButtonColor='purple'
              onConfirm={() => handleFileUpload(selectedGroup)}
              onCancel={onClearFile}
            />

       
          { isAdmin ? (
            isActiveDiscussion ? (
              <Button
                colorPalette="blue"
                onClick={handleCloseDiscussion}
              >
                Close Disc
              </Button>
            ) : (
              <CustomDialog
                triggerButton={<Button colorPalette="blue">Disc</Button>}
                dialogTitle='Post a discussion with topic'
                dialogBody={
                  <Input 
                    value={discussionTopic} 
                    onChange={(e) => setDiscussionTopic(e.target.value)}
                    placeholder='Enter discussion topic...'
                  />
                  }
                confirmButtonText='Post'
                confirmButtonColor='blue'
                onConfirm={handlePostDiscussion}
              />
            )
          ) : 
            (<></>)
          }
          
        </HStack>
      
      </Box>
    </Flex>
  );
};

export default GroupChatPage;
