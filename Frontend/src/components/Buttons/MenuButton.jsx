import { Box, Flex } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { useState } from 'react';



const MenuButton = ({ icon, children, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <IconButton
      width="100%"
      height="60px"
      color={isHovered ? "white" : "gray.600"}
      bg={isHovered ?  "linear-gradient(45deg, #56d8e4, #4050dc)" : "transparent"}
      justifyContent="flex-start"
      variant="ghost"
      py={4}
      px={6}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      
      {...props}
    >
      <Flex width="100%" justifyContent="flex-start" alignItems="center">
        <Box as="span" mr={4} fontSize="1.5rem" color={isHovered ? "white" : "inherit"}> 
          {icon}
        </Box>
        <Box as="span" fontWeight="medium" fontSize="1rem"> 
          {children}
        </Box>
      </Flex>
    </IconButton>
  );
};

export default MenuButton;