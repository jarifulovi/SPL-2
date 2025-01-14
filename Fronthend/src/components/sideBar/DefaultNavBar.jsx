import React from 'react';
import { Box, IconButton, Flex, Text, Button } from "@chakra-ui/react";
import PopOver from '../Buttons/PopOver';
import { IoIosArrowDropdown } from "react-icons/io";

import { useNavigate } from 'react-router-dom';

const DefaultNavBar = () => {

    const navigate = useNavigate();
 
    const navigateTo = (path) => {
        navigate(path);
    }

  
    return (
        <Box as="nav" bg="gray.100" p={4} boxShadow="md" h="70px">
        <Flex align="center" justify="space-between">
            <Flex gap={4}> 

                <Text textStyle="3xl" fontWeight="bold">
                    Study Sinc
                </Text>

                <PopOver trigger={<IconButton><IoIosArrowDropdown/></IconButton>}>
                    <Button width="90%" onClick={() => navigateTo("/login")}>Create Group</Button>
                    <Button width="90%" onClick={() => navigateTo("/")}>Search Group</Button>
                </PopOver>
            </Flex>

            <Button onClick={()=> navigateTo('/login')}>Login</Button>
        </Flex>
        </Box>
    );
};

export default DefaultNavBar;