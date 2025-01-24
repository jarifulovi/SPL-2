import { useState } from "react"
import { Button } from "../components/ui/button"
import { Flex, Box, Text, Input, VStack, Link } from "@chakra-ui/react"

// import custom components
import PageLayout from "../components/Others/PageLayout";
import ConditionalNavBar from '../components/sideBar/ConditionalBar';
import SliderInput from "../components/Buttons/SliderInput"
import PopOver from "../components/Buttons/PopOver"
import RadioButton from "../components/Buttons/RadioButton"
import GroupCard from "../components/Others/GroupCard"

const items = [
  { value: "public", label: "public" },
  { value: "private", label: "private" },
];

// Dummy data for group
const group = {
  group_name: "Study Group",
  group_description: "A group for collaborative learning.",
  group_size: 4,
  group_status: "public",
  group_image: ""
};


const MainPage = () => {

  // States of filters
  const [groupStatus, setStatus] = useState(items[0].value);
  

  const handleStatusChange = (newValue) => {
    setStatus(newValue);
    //console.log("Selected Value:", newValue); 
  }

  const [memberSize, setMemberSize] = useState([50]);
  const handleMemberSizeChange = (newValue) => {
    setMemberSize(newValue);
    //console.log("Selected Value:", newValue);
  }


  return (
    <PageLayout>
        <VStack spacing={10} align="center" width="full">
          <Text textStyle="5xl" fontWeight="semibold">Discover Group</Text>
  
          <Text>
            or{" "}
            <Link
              variant="plain"
              fontWeight="bold"
              href="#"
              colorPalette="teal"
            >
              Create Group
            </Link>{" "}
            now
          </Text>
  
          <Input 
            placeholder="Search for groups..." 
            width="500px" 
            height="50px"         
            size="lg"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1)"
          />
          <Button colorScheme="teal">Search</Button>
          <PopOver trigger={<Button size="sm" variant="outline">filter</Button>}>
            <Text>Status : </Text>
            <RadioButton value={groupStatus} onChange={handleStatusChange} items={items}/>
            <Text>Maximum Members : </Text>
            <SliderInput value={memberSize} maxValue={500} minValue={0} onChange={handleMemberSizeChange} />
          </PopOver>
  
          {/* Extract all group here */}
          <GroupCard group={group} onClick={(e) => console.log(e)} />
          <GroupCard group={group} onClick={(e) => console.log(e)} />
        </VStack>
      
    </PageLayout>
  );
  
  
  
};

export default MainPage;
