import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiAlignJustify } from "react-icons/fi";
import { Box, IconButton, Flex, Text, Button } from "@chakra-ui/react";
import { DrawerTrigger } from '../../components/ui/drawer';
import { Avatar } from '../../components/ui/avatar';
import PopOver from '../Buttons/PopOver';
import DropDown from '../Buttons/DropDown';
import { IoIosArrowDropdown } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";

import CustomAvatar from '../Others/CustomAvatar';
import NotificationItem from '../Others/NotificationItem';
import NavBarContainer from './NavBarContainer';
import StudySyncText from '../Fragments/StudySyncText';

import AuthApi from '../../services/AuthApi';
import { SocketContext } from '../../utils/SocketContext';

const NavBar = ({ profilePicUrl, notifications = [] }) => {
 
  const { disconnectSocket } = useContext(SocketContext);
  const navigate = useNavigate();
 
  const navigateTo = (path) => {
    navigate(path);
  }

  const handleLogout = async () => {
    const email = localStorage.getItem('email');
    if (email) {
      await AuthApi.logOut(email);
      localStorage.clear();
      disconnectSocket();
      navigate('/login');
    }
    console.log("Logout clicked");
  };

  return (
    <NavBarContainer>
      <Flex gap={4}> 
        {/* Side bar button was there */}
        <DrawerTrigger asChild>
          <IconButton>
            <FiAlignJustify />
          </IconButton>
        </DrawerTrigger>
        <Button 
          onClick={() => navigateTo("/")} bg="transparent"
        >
          <StudySyncText />
        </Button>

        <PopOver trigger={<IconButton><IoIosArrowDropdown/></IconButton>}>
          <Button width="90%" onClick={() => navigateTo("/createGroup")}>Create Group</Button>
          <Button width="90%" onClick={() => navigateTo("/")}>Search Group</Button>
        </PopOver>
      </Flex>

      <Flex gap={4}>
        <PopOver trigger={<IconButton><IoMdNotificationsOutline/></IconButton>}>
          {/* Extract all notifications here */}
          
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <NotificationItem
                key={index}
                notification={notification}
              />
            ))
          ) : (
            <Box p={2}>No notifications</Box>
          )}
        </PopOver>
        
        <DropDown
          trigger={
            <Button p={0} bg="transparent" borderRadius="full">
              <CustomAvatar src={profilePicUrl} size="sm" />
            </Button>
          }
          menuItems={[
            {
              value: "profile",
              label: "Profile",
              onClick: () => navigateTo("/profile"),
            },
            {
              value: "accountSettings",
              label: "Settings",
              onClick: () => navigateTo("/accountSettings"),
            },
            {
              value: "logout",
              label: "Logout",
              onClick: handleLogout,
              isDanger: true,
            },
          ]}
        />

      </Flex>
    </NavBarContainer>
  );
};

export default NavBar;