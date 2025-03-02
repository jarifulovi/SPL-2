import React from 'react';
import { Box } from '@chakra-ui/react';
import { Tooltip } from '../../components/ui/tooltip';

import { useColorModeValue } from '../../components/ui/color-mode';




const FolderItem = ({ children, content = '', onClick = ()=>{} }) => {

    const folderBg = useColorModeValue('blue.100','gray.800');
    const hoverBg = useColorModeValue('blue.200', 'gray.700');
    return (
        <Tooltip openDelay={100}> 
            <Box
                width="150px"
                height="150px"
                bg={folderBg}
                borderRadius="8px"
                boxShadow="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                m={5}
                _hover={{ bg: hoverBg }}
                onClick={onClick}
            >
                <Tooltip content={content}>
                    {children}
                </Tooltip>
                
            </Box>
        </Tooltip>
    );
};

export default FolderItem;