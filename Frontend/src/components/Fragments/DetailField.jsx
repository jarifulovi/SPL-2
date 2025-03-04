
import { Text, Stack } from "@chakra-ui/react"


const DetailField = ({ field, label }) => {
  return (
    <Stack direction="row" spacing={2} mb={3}>
      <Text fontWeight="bold">{label}:</Text>
      <Text>{field || 'Not provided'}</Text>
    </Stack>
  );
};

export default DetailField;