import { Button, Card, Image, Text } from "@chakra-ui/react"


// group is a object of class

const GroupCard = ({ group = {}, onClick = ()=>{} }) => {
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
        onClick={onClick}
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
        <Text>
            Status  : {group.group_status} {" "}
            Members : {group.group_size}
        </Text>
      </Card.Footer>
    </Card.Root>
  )
};


export default GroupCard;
