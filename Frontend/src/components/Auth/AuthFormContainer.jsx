import React from 'react';
import { Flex, Box, useBreakpointValue } from '@chakra-ui/react';

const AuthFormContainer = ({ children, imageSrc }) => {
  return (
    <Flex
      borderRadius="lg"
      padding="4"
      width={useBreakpointValue({ base: "90%", md: "60%" })}
      boxShadow="lg"
      bg="white"
      color="black"
    >
      <Box 
        p={8}
        bg="white"
        width={useBreakpointValue({ base: "100%", md: "50%" })}
        maxWidth="350px"
      >
        {children}
      </Box>
      
      <Box
        display={{ base: "none", md: "flex" }}
        width={{ base: "0", md: "50%" }}
        justifyContent="center"
        alignItems="center"
      >
        <img
          src={imageSrc}
          alt="Auth"
          style={{ borderRadius: '0', width: '100%', height: '100%' }}
        />
      </Box>
    </Flex>
  );
};

export default AuthFormContainer;
