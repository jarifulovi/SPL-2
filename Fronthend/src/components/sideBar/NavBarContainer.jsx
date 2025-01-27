import { Box, Flex } from '@chakra-ui/react';



const NavBarContainer = ({ children }) => {
    return (
        <Box 
            as="nav" 
            p={4} 
            boxShadow="md" 
            h="70px"
            position="sticky" 
            top="0" 
            zIndex="sticky"
        >
            <Flex align="center" justify="space-between">
                {children}
            </Flex>
        </Box>
    );
};

export default NavBarContainer;