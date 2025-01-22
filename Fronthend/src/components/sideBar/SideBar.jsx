import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext  } from 'react';
import  NavBar  from './NavBar';
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Box, Flex, VStack, IconButton } from "@chakra-ui/react";
import { RxDashboard } from "react-icons/rx";
import { TiGroupOutline } from "react-icons/ti";
import { FiAlignJustify } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
import { FaUserCircle } from 'react-icons/fa';
import MenuButton from '../Buttons/MenuButton';

import NotificationApi from '../../services/NotificationApi';
import { SocketContext } from '../../utils/SocketContext';


const SideBar = () => {

  // First retrieve user_id,email,notifications
  const user_id = localStorage.getItem('user_id');
  const email = localStorage.getItem('email');

  const { onEvent, emitEvent } = useContext(SocketContext);
  const [ notifications, setNotifications ] = useState([]);
  


  const fetchNotifications = async () => {
    try {
      const response = await NotificationApi.fetchNotifications(user_id);
      setNotifications(response.data);
      console.log('Notifications:', notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications([]);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
  

  const navigate = useNavigate();
 
  const handleMenuClick = (path) => {
    navigate(path);
  }

  const profilePicUrl = "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg";
  const dummy = [
    {
      type: 'invitation',
      content: 'You have been invited to join the group "Group 1"',
      receive_date: '2024-04-01T12:00:00Z',
    },
    {
      type: 'discussion_topic',
      content: 'Discussion topic: "Introduction to React"',
      receive_date: '2024-04-02T15:30:00Z',
    },
    {
      type: 'join_request',
      content: 'User "John Doe" wants to join your group',
      receive_date: '2024-04-03T09:45:00Z',
    },
    {
      type: 'join_group',
      content: 'User "Alice Smith" has joined the group "Group 2"',
      receive_date: '2024-04-04T18:20:00Z',
    },
    {
      type: 'file_shared',
      content: 'File "Project Report" has been shared in the group "Group 3"',
      receive_date: '2024-04-05T11:10:00Z',
    },
    {
      type: 'video_conferencing',
      content: 'Video conferencing session scheduled for "Group 4"',
      receive_date: new Date(),
    },
  ]

  

  return (

    <>
    
    <DrawerRoot placement={"start"}>
      <DrawerBackdrop />
      
    
      <NavBar profilePicUrl={profilePicUrl} notifications={notifications}></NavBar>
      <DrawerContent w='260px' pt='10px' bg='gray.100'>
        <DrawerHeader>
          <DrawerTitle color='gray.800' textAlign='center'>Menu</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <VStack spacing={4}>
           
            <MenuButton icon={<TiGroupOutline/>} aria-label="Groups" onClick={()=> handleMenuClick('/groups')}> 
              Groups
            </MenuButton>
           
            <MenuButton icon={<IoBookOutline/>} aria-label="Files" onClick={()=> handleMenuClick('/files')}>
              Files
            </MenuButton>
          </VStack>
        </DrawerBody>
        <DrawerFooter>
         
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
    </>
  );
};

export default SideBar;
