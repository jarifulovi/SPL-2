import { Box, Flex } from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';



const NavBarContainer = ({ children }) => {
    const bgColor = useColorModeValue('gray.100', 'gray.900');

    return (
        <Box 
            bg={bgColor}
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