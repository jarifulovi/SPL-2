import React from 'react';
import { Flex, useBreakpointValue } from '@chakra-ui/react';

const AuthPageLayout = ({ children }) => {
    return (
      <Flex
        minHeight="100vh"
        alignItems="center"
        justifyContent="center"
        bg="linear-gradient(115deg, #56d8e4 10%, #9f01ea 90%)"
      >
        {children}
      </Flex>
    );
  };
  
  export default AuthPageLayout;