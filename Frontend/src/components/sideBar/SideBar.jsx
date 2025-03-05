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
import ProfileApi from '../../services/ProfileApi';
import { SocketContext } from '../../utils/SocketContext';


const SideBar = () => {

  // First retrieve user_id,email,notifications
  const user_id = localStorage.getItem('user_id');
  const email = localStorage.getItem('email');

  const { onEvent, offEvent, emitEvent } = useContext(SocketContext);
  const [ notifications, setNotifications ] = useState([]);
  const [ profilePicUrl, setProfilePicUrl ] = useState('');
  


  const fetchNotifications = async () => {
    try {
      const response = await NotificationApi.fetchNotifications(user_id);
      const result = await ProfileApi.getOwnProfileData(user_id);
      setProfilePicUrl(result.data.profile.profile_picture);
      setNotifications(response.data);
      console.log('Notifications:', notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications([]);
    }
  };


  // On first mount
  useEffect(() => {
    fetchNotifications();
  }, []);


  // Listening for new notifications
  useEffect(() => {
    const handleNewNotification = (newNotification) => {
      setNotifications((prev) => [...prev, newNotification]);
    };

    onEvent('notification', handleNewNotification);

    return () => {
      offEvent('notification', handleNewNotification);
    };
  }, []);

  

  const navigate = useNavigate();
 
  const handleMenuClick = (path) => {
    navigate(path);
  }


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
