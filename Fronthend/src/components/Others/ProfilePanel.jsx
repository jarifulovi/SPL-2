import { Box, Text, Stack, Badge } from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';


const getProfileField = (field, label) => {
  return (
    <Stack direction="row" spacing={2} mb={3}>
      <Text fontWeight="bold">{label}:</Text>
      <Text>{field || 'Not provided'}</Text>
    </Stack>
  );
};

const getArrayField = (values, label) => {
  return (
    <Stack direction="row" spacing={2} mb={3}>
      <Text fontWeight="bold">{label}:</Text>
      {values && values.length > 0 ? (
        <Stack direction="row" spacing={2} wrap="wrap">
          {values.map((value, index) => (
            <Badge key={index} colorScheme="green" fontSize="sm">
              {value}
            </Badge>
          ))}
        </Stack>
      ) : (
        <Text>Not provided</Text>
      )}
    </Stack>
  );
};

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
          {getProfileField(profile.date_of_birth && new Date(profile.date_of_birth).toLocaleDateString(), 'Date of Birth')}     
          {getProfileField(profile.gender, 'Gender')}
          {getProfileField(profile.phone_number, 'Phone')}
          {getProfileField(profile.address, 'Address')}
          {getProfileField(profile.education, 'Education')}
          {getProfileField(profile.hobby, 'Hobby')}
          {getProfileField(profile.role, 'Role')}

          {/* Student-specific fields */}
          {profile.role === 'student' && (
            <>
              {getProfileField(profile.course_of_study, 'Course of Study')}
              {getProfileField(profile.current_year_or_semester, 'Current Year/Semester')}
              {getProfileField(profile.department, 'Department')}
              {getArrayField(profile.skills, 'Skills')}
              {/* Grade Sheet and resume */}
              {getProfileField(profile.grade_sheet, 'Grade Sheet')}
              {getProfileField(profile.resume, 'Resume')}
            </>
          )}   

          {/* Teacher-specific fields */}
          {profile.role === 'teacher' && (
            <>
              {getArrayField(profile.subjects, 'Subjects')}
              {getArrayField(profile.qualifications, 'Qualifications')}
              {getProfileField(profile.designation, 'Designation')}
              {getProfileField(profile.experience, 'Experience')}
            </>
          )}

        </>
      )}
    </Box>
  );
};

export default ProfilePanel;
