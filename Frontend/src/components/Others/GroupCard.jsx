import { Button, Card, Image, Text, HStack, VStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";


// group is a object of class
const defaultOnClick = (group, navigate) => {
  navigate(`/groupDetails/${group.group_id}`, {
    state: {
      group,
    }
  });
}


const GroupCard = ({ group = {}, onClick, handleJoin = ()=>{}, isUserInGroup = false }) => {
  
  const navigate = useNavigate();

  // Set a default onClick if not provided
  const handleClick = onClick || (() => defaultOnClick(group, navigate));

  return (
    <Card.Root 
        width="300px" 
        overflow="hidden"
        cursor="pointer"
        _hover={{
            transform: "scale(1.02)",
            boxShadow: "lg",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onClick={handleClick}
        >
      <Image
        src={group.group_image}
        alt="Couldn't fetch image"
        height="150px"
        objectFit="cover"
      />
      <Card.Body gap="2">
        <Card.Title>{group.group_name}</Card.Title>
        <Card.Description lineClamp="3">
            {group.group_description}
        </Card.Description>
        
      </Card.Body>
      <Card.Footer gap="2">
        <VStack width="full">
          <HStack width="full" justify="space-between">
            <Text>Status : {group.group_status} {" "}</Text>
            <Text>Members: {group.group_size}</Text>
          </HStack>

          {group && isUserInGroup === false && <Button width="full" onClick={handleJoin}>Join</Button>}
 
        </VStack>
       
      </Card.Footer>
    </Card.Root>
  )
};


export default GroupCard;
