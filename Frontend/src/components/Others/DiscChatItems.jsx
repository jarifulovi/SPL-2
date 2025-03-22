import { Text, Timeline } from "@chakra-ui/react"
import { LuCheck, LuPackage, LuShip } from "react-icons/lu"
import CustomAvatar from "./CustomAvatar";


// dummy data
const discussionThreadChats = [
    {
      chat_id: '1',
      sender: 'John Doe',
      send_at: '2021-05-18',
      content: 'This is a discussion topic',
    },
    {
      chat_id: '2',
      sender: 'Jane Doe',
      send_at: '2021-05-19',
      content: 'This is a discussion thread chat',
    },
  ];

const formatDate = (date) => {
  const messageDate = new Date(date);
  const hours = messageDate.getHours().toString().padStart(2, '0');
  const minutes = messageDate.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes} • ${messageDate.toLocaleDateString()}`;
};

const DiscChatItems = ({ groupMembersMap, groupMembersProPicMap, discussionThreadChats = [] }) => {
  return (
    <Timeline.Root p="2">
      {discussionThreadChats.reverse().map((chat, index) => (
        <Timeline.Item key={chat.chat_id}>
        <Timeline.Connector>
          <Timeline.Separator />
          <Timeline.Indicator>
            <CustomAvatar size="2xs"/>
          </Timeline.Indicator>
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title size='sm'>{groupMembersMap[chat.sender] || chat.sender}</Timeline.Title>
          <Timeline.Description size='sm'>{formatDate(chat.send_at)}</Timeline.Description>
          <Text textStyle="md">
            {chat.content}
          </Text>
        </Timeline.Content>
      </Timeline.Item>
      ))}
    </Timeline.Root>
  )
};

export default DiscChatItems;
