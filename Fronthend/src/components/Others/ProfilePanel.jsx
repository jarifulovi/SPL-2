import { Box, Text, Stack, Badge } from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';

const ProfilePanel = ({ profile }) => {

  // Check if the profile object is empty or has no data
  const isEmptyProfile = !profile || Object.keys(profile).length === 0;

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
            No profile data available. Please update your profile.
          </Text>
        </Box>
      ) : (
        // If the profile is not empty, render the profile data
        <>
          {/* Date of Birth */}
          {profile.date_of_birth && (
            <Stack direction="row" spacing={2} mb={3}>
              <Text fontWeight="bold">Date of Birth:</Text>
              <Text>{new Date(profile.date_of_birth).toLocaleDateString()}</Text>
            </Stack>
          )}

          {/* Gender */}
          {profile.gender && (
            <Stack direction="row" spacing={2} mb={3}>
              <Text fontWeight="bold">Gender:</Text>
              <Text>{profile.gender}</Text>
            </Stack>
          )}

          {/* Phone Number */}
          {profile.phone_number && (
            <Stack direction="row" spacing={2} mb={3}>
              <Text fontWeight="bold">Phone:</Text>
              <Text>{profile.phone_number}</Text>
            </Stack>
          )}

          {/* Address */}
          {profile.address && (
            <Stack direction="row" spacing={2} mb={3}>
              <Text fontWeight="bold">Address:</Text>
              <Text>{profile.address}</Text>
            </Stack>
          )}

          {/* Department */}
          {profile.department && (
            <Stack direction="row" spacing={2} mb={3}>
              <Text fontWeight="bold">Department:</Text>
              <Text>{profile.department}</Text>
            </Stack>
          )}

          {/* Education */}
          {profile.education && (
            <Stack direction="row" spacing={2} mb={3}>
              <Text fontWeight="bold">Education:</Text>
              <Text>{profile.education}</Text>
            </Stack>
          )}

          {/* Role */}
          {profile.role && (
            <Stack direction="row" spacing={2} mb={3}>
              <Text fontWeight="bold">Role:</Text>
              <Text>{profile.role}</Text>
            </Stack>
          )}

          {/* Student-specific fields */}
          {profile.course_of_study && (
            <Stack direction="row" spacing={2} mb={3}>
              <Text fontWeight="bold">Course of Study:</Text>
              <Text>{profile.course_of_study}</Text>
            </Stack>
          )}

          {profile.current_year_or_semester && (
            <Stack direction="row" spacing={2} mb={3}>
              <Text fontWeight="bold">Current Year/Semester:</Text>
              <Text>{profile.current_year_or_semester}</Text>
            </Stack>
          )}

          {profile.hobby && (
            <Stack direction="row" spacing={2} mb={3}>
              <Text fontWeight="bold">Hobby:</Text>
              <Text>{profile.hobby}</Text>
            </Stack>
          )}

          {/* Grade Sheet */}
          {profile.grade_sheet && (
            <Stack direction="row" spacing={2} mb={3}>
              <Text fontWeight="bold">Grade Sheet:</Text>
              <Text>{profile.grade_sheet}</Text>
            </Stack>
          )}

          {/* Resume */}
          {profile.resume && (
            <Stack direction="row" spacing={2} mb={3}>
              <Text fontWeight="bold">Resume:</Text>
              <Text>{profile.resume}</Text>
            </Stack>
          )}

          {/* Teacher-specific fields */}
          {profile.subjects && profile.subjects.length > 0 && (
            <Stack direction="row" spacing={2} mb={3}>
              <Text fontWeight="bold">Subjects:</Text>
              <Stack direction="row" spacing={2} wrap="wrap">
                {profile.subjects.map((subject, index) => (
                  <Badge key={index} colorScheme="green" fontSize="sm">
                    {subject}
                  </Badge>
                ))}
              </Stack>
            </Stack>
          )}

          {profile.designation && (
            <Stack direction="row" spacing={2} mb={3}>
              <Text fontWeight="bold">Designation:</Text>
              <Text>{profile.designation}</Text>
            </Stack>
          )}

          {profile.experience && (
            <Stack direction="row" spacing={2} mb={3}>
              <Text fontWeight="bold">Experience:</Text>
              <Text>{profile.experience} years</Text>
            </Stack>
          )}
        </>
      )}
    </Box>
  );
};

export default ProfilePanel;
