'use client'

import { useNavigate } from 'react-router-dom';
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Link,
  Badge,
} from '@chakra-ui/react'
import { useColorModeValue } from '../ui/color-mode';
import {Button} from '../ui/button';

import CustomAvatar from './CustomAvatar';

const ProfileCard = ({ profilePicUrl, user_id, name, email, bio, skills, otherUser = false }) => {

    const navigate = useNavigate();
    return (
        <Center py={0}>
            <Box
                maxW={'320px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}
            >
                
                <CustomAvatar src={profilePicUrl}  size="3xl"/>
                <Heading fontSize={'2xl'} fontFamily={'body'}>
                    {name}
                </Heading>
                <Text fontWeight={600} color={'gray.500'} mb={4}>
                    {email}
                </Text>
                <Text fontWeight={600} color={'gray.500'} mb={4}>
                    {user_id}
                </Text>
                <Text
                    textAlign={'center'}
                    color={useColorModeValue('gray.700', 'gray.400')}
                    px={3}
                    whiteSpace="normal"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    maxHeight="100px" 
                    overflowY="auto"
                >
                    {bio}
                </Text>

                <Stack align={'center'} justify={'center'} direction={'row'} mt={6} wrap="wrap">
                    {skills?.map((skill, index) => (
                        <Badge
                        key={index}
                        px={2}
                        py={1}
                        bg={useColorModeValue('gray.50', 'gray.800')}
                        fontWeight={'400'}
                        m={1}>
                        #{skill}
                        </Badge>
                    ))}
                </Stack>

                {/* Add otherUser button in future */}
                { !otherUser ? (
                    <Button
                        w='full'
                        mt={4}
                        onClick={() => navigate('/updateProfile')}
                    >
                    Update
                    </Button>
                    ) : <></>
                }
                
                
            </Box>
        </Center>
    )
};


export default ProfileCard;