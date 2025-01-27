import { Text, Badge, Stack } from "@chakra-ui/react"



const DetailArrayField = ({ field, label }) => {
  return (
    <Stack direction="row" spacing={2} mb={3}>
      <Text fontWeight="bold">{label}:</Text>
      {field && field.length > 0 ? (
        <Stack direction="row" spacing={2} wrap="wrap">
          {field.map((value, index) => (
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

export default DetailArrayField;