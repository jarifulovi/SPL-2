import { Box, Text } from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';

import DetailField from '../Fragments/DetailField';
import DetailArrayField from '../Fragments/DetailArrayField';



// ProfilePanel both uses in own profile and others profile
// Empty profile if is_visible == false
// If otherUser == true && empty then profile hidden activates 
const ProfilePanel = ({ profile, otherUser = false }) => {

  const isEmptyProfile = !profile || Object.keys(profile).length === 0;
  const noDataText = "No profile data available. Please update your profile.";
  const hiddenDataText = "Profile data has been hidden by user.";

  return (
    <Box
      w="full"
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow="md"
      rounded="lg"
      p={4}
      textAlign="left"
    >
      {isEmptyProfile ? (
        // If the profile is empty, show a fixed-height box with a message
        <Box
          h="200px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg={useColorModeValue('gray.100', 'gray.700')}
          borderRadius="md"
        >
          <Text fontSize="lg" color={useColorModeValue('gray.700', 'gray.300')}>
            {otherUser ? hiddenDataText : noDataText}
          </Text>
        </Box>
      ) : (
        // If the profile is not empty, render the profile data
        <>
          <DetailField field={profile.date_of_birth && new Date(profile.date_of_birth).toLocaleDateString()} label="Date of Birth" />
          <DetailField field={profile.gender} label="Gender" />
          <DetailField field={profile.phone_number} label="Phone" />
          <DetailField field={profile.address} label="Address" />
          <DetailField field={profile.education} label="Education" />
          <DetailField field={profile.hobby} label="Hobby" />
          <DetailField field={profile.role} label="Role" />


          {/* Student-specific fields */}
          {profile.role === 'student' && (
            <>
              <DetailField field={profile.course_of_study} label="Course of Study" />
              <DetailField field={profile.current_year_or_semester} label="Current Year/Semester" />
              <DetailField field={profile.department} label="Department" />
              <DetailArrayField field={profile.skills} label="Skills" />
              {/* Grade Sheet and Resume */}
              <DetailField field={profile.grade_sheet} label="Grade Sheet" />
              <DetailField field={profile.resume} label="Resume" />

            </>
          )}   

          {/* Teacher-specific fields */}
          {profile.role === 'teacher' && (
            <>
              <DetailArrayField field={profile.subjects} label="Subjects" />
              <DetailArrayField field={profile.qualifications} label="Qualifications" />
              <DetailField field={profile.designation} label="Designation" />
              <DetailField field={profile.experience} label="Experience" />
            </>
          )}

        </>
      )}
    </Box>
  );
};

export default ProfilePanel;
