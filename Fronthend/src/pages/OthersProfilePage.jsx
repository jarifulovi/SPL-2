import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Box, Flex, Spinner,  useBreakpointValue } from '@chakra-ui/react';
import { toaster } from '../components/ui/toaster';
import ProfileCard from "../components/Others/ProfileCard"
import ProfilePanel from "../components/Others/ProfilePanel";
import CustomSpinner from '../components/Others/CustomSpinnner';

import ProfileApi from '../services/ProfileApi';


// This component heavily dependent on otherUser ( true if other user viewing profile )
const OthersProfilePage = () => {

  const [profileData, setProfileData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const user_id = localStorage.getItem('user_id');
  const location = useLocation();
  const navigate = useNavigate();
  const { profileUserId } = location.state || {};
  const otherUser = profileUserId !== user_id;

  
  const retrieveData = async () => {
    try {
      
      const result = await ProfileApi.getOthersProfileData(profileUserId, user_id);
      console.log(result.data);
      const profileData = result.data;

      setProfileData(profileData || {});
      setImageUrl(profileData?.profile?.profilePicUrl || '');
      
    } catch (error) {
      toaster.create({
        description: error.message,
        type: "error"
      });
    }
  }
  useEffect(() => {
    retrieveData();
  }, []);




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
          <ProfilePanel profile={profileData.profile} otherUser={otherUser}/>
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
            otherUser={otherUser}
          />
        ) : (
          <CustomSpinner text="Loading..." />
        )}
      </Box>
    </Flex>
  );
};

export default OthersProfilePage;