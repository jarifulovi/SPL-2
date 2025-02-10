import React from 'react';
import { Box, IconButton, Flex, Text, Button } from "@chakra-ui/react";
import PopOver from '../Buttons/PopOver';
import { IoIosArrowDropdown } from "react-icons/io";
import NavBarContainer from './NavBarContainer';

import { useNavigate } from 'react-router-dom';

const DefaultNavBar = () => {

    const navigate = useNavigate();

  
    return (
        <NavBarContainer>
            <Flex gap={4}> 

                <Text textStyle="3xl" fontWeight="bold">
                    StudySync
                </Text>

                <PopOver trigger={<IconButton><IoIosArrowDropdown/></IconButton>}>
                    <Button width="90%" onClick={() => navigate("/login")}>Create Group</Button>
                    <Button width="90%" onClick={() => navigate("/")}>Search Group</Button>
                </PopOver>
            </Flex>

            <Button onClick={()=> navigate('/login')}>Login</Button>
        </NavBarContainer>
    );
};

export default DefaultNavBar;