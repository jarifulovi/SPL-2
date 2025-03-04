import { Avatar } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";

const CustomAvatar = ({ src, size, shape = 'full' }) => {
  src = src || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png";

  return (
    
    <Avatar.Root 
      size={size} 
      cursor="pointer"
      shape={shape}
    >
      <Avatar.Fallback name="Profile"/>
      <Avatar.Image src={src} />
    </Avatar.Root>
  
  );
};

export default CustomAvatar;