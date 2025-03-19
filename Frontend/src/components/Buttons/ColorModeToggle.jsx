
import { useColorMode, useColorModeValue } from '../ui/color-mode';
import { Flex } from '@chakra-ui/react';
import { Switch } from '../ui/switch';


const ColorModeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const borderColor = useColorModeValue("gray.300", "gray.600");
    return (
        <Flex
            bg={borderColor}
            borderRadius={10}
            p={1}
        >
            <Switch 
                onChange={toggleColorMode} 
                checked={colorMode === "dark"}
            />
        </Flex>
    );
};

export default ColorModeToggle;

