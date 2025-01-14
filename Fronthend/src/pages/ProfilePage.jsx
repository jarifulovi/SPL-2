import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Flex, Spinner, useBreakpointValue } from '@chakra-ui/react';
import ProfileCard from "../components/Others/ProfileCard"
import ProfilePanel from "../components/Others/ProfilePanel";
import CustomSpinner from '../components/Others/CustomSpinnner';

import ProfileApi from '../services/ProfileApi';


const ProfilePage = () => {

  const [profileData, setProfileData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const user_id = localStorage.getItem('user_id');

  
  const retrieveData = async () => {
    try {
      const result = await ProfileApi.getOwnProfileData(user_id);
      console.log(result.data);
      const profileData = result.data;

      setProfileData(profileData);
      setImageUrl(profileData.profile.profilePicUrl);
      
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    retrieveData();
  }, [user_id]);




  const direction = useBreakpointValue({ base: 'column', md: 'row' });
  return (
    <Flex
      direction={direction}       
      wrap="wrap"                 
      justify="space-between"    
      align="flex-start"         
      gap={6}                     
      p={6}
    >
      <Box flex="1" minW="300px">
        {profileData ? (
          <ProfilePanel profile={profileData.profile} />
        ) : (
          <CustomSpinner text="Loading..." />
        )}
      </Box>

      <Box flex="1" minW="300px">
      {profileData ? (
          <ProfileCard
            profilePicUrl={imageUrl}
            user_id={user_id}
            name={profileData.name || 'Loading...'}
            email={profileData.email || 'Loading...'}
            bio={profileData.profile ? profileData.profile.bio : '' }
            skills={profileData.profile ? (profileData.profile.skills || profileData.profile.designation) : []}
          />
        ) : (
          <CustomSpinner text="Loading..." />
        )}
      </Box>
    </Flex>
  );
};

export default ProfilePage;