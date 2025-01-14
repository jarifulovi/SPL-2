
import { Flex, Box } from '@chakra-ui/react';
import { useColorMode } from '../ui/color-mode';

const AuthFlexContainer = ({ children }) => {
    const { colorMode } = useColorMode();

    return (
        <Flex 
            minH="100vh" 
            alignItems="center" 
            justifyContent="center" 
            bg={colorMode === 'dark' ? '' : 'gray.100'} // Adjust background color based on color mode
        >
            <Box 
                width={["90%", "400px"]} 
                mx="auto" 
                p="6" 
                borderWidth="1px" 
                borderRadius="md" 
                bg={colorMode === 'dark' ? '' : 'white'} // Box background color
            >
                {children}
            </Box>
        </Flex>
    );
};

export default AuthFlexContainer;
