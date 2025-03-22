"use client"

import {
  Box,
  Button,
  Center,
  Presence,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"

import ChatItem from './ChatItem';
import DiscChatItems from './DiscChatItems';




// create a new chatItem for the discussion start message
const DiscussionStartItem = ({ message, groupMembersMap, groupMembersProPicMap, discussionThreadChats = [] }) => {
  const { open, onToggle } = useDisclosure()
  
  return (
    <Stack gap="4">
        <ChatItem
            message={message}
            groupMembersMap={groupMembersMap}
            groupMembersProPicMap={groupMembersProPicMap}
            isClickable={true}
            onClick={onToggle}
        />
      
      <Presence
        present={open}
        animationName={{ _open: "fade-in", _closed: "fade-out" }}
        animationDuration="moderate"
      >
        <DiscChatItems 
            groupMembersMap={groupMembersMap}
            groupMembersProPicMap={groupMembersProPicMap}
            discussionThreadChats={discussionThreadChats}
        />
      </Presence>
    </Stack>
  )
};

export default DiscussionStartItem;
