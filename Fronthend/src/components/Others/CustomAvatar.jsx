import { Avatar } from "../ui/avatar";
import { Box } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";

const CustomAvatar = ({ src, size }) => {
  src = src || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png";

  return (
    <Box
      _hover={{
        transform: "scale(1.1)",
        transition: "transform 0.2s",
        border: "2px solid",
        borderColor: "blue.500",
      }}
      bg="gray.200"
      borderRadius="full"
      border="2px solid"
      borderColor="black"
      display="inline-block"
    >
      <Avatar 
        src={src} 
        size={size} 
        cursor="pointer"
      />
    </Box>
  );
};

export default CustomAvatar;