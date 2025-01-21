import React, { useState } from 'react';
import { Box, Flex, VStack } from '@chakra-ui/react';
import { Button } from "../components/ui/button";
import UpdateProfilePage from '../components/SubPages/UpdateProfilePage';
import ChangePasswordPage from '../components/SubPages/ChangePasswordPage';


const AccountSettingsPage = () => {
  const [activeComponent, setActiveComponent] = useState('profile');
  console.log(activeComponent);
  
  const renderComponent = () => {
    switch (activeComponent) {
      case 'profile':
        return <UpdateProfilePage />;
      case 'password':
        return <ChangePasswordPage />;
      default:
        return <Box>No component selected</Box>;
    }
  };

  return (
    <Flex h="100vh" w="100%">
      {/* Left Sidebar */}
      <Box w="20%" p={4} m={4} h="100%">
        <VStack align="start" spacing={4}>
          <Button onClick={() => setActiveComponent('profile')} w="100%">
            Update Profile
          </Button>
          <Button onClick={() => setActiveComponent('password')} w="100%">
            Change Password
          </Button>
          {/* Add more buttons here */}
        </VStack>
      </Box>

      {/* Right Content Area */}
      <Box flex="1" p={4} m={4} maxW="800px" h="auto" borderRadius="md">
        {renderComponent()}
      </Box>
    </Flex>
  );
};

export default AccountSettingsPage;
