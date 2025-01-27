import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Flex, Box, Text, Input, VStack, HStack, Link } from "@chakra-ui/react"

// import custom components
import PageLayout from "../components/Others/PageLayout";
import SliderInput from "../components/Buttons/SliderInput"
import PopOver from "../components/Buttons/PopOver"
import RadioButton from "../components/Buttons/RadioButton"
import GroupCard from "../components/Others/GroupCard"

import GroupSearchApi from "../services/GroupSearchApi";



const stringToArrayParse = (value) => {
  // topics separated by comma
  return value.split(",");
}


const MainPage = () => {

  const [allGroups, setAllGroups] = useState([]);
  // States of filters
  const [formData, setFormData] = useState({
    memberSize: 50,
    type: '',
    topics: [],
    groupName: '',
  });

 
  const handleFilterChange = (field) => (e) => {

    let value = e.target.value;
    if(field === 'topics') {
      value = stringToArrayParse(value);
    }
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    
  };

  
  const handleMemberSizeChange = (newValue) => {
    if (Array.isArray(newValue) && newValue.length > 0) {
      setFormData((prev) => ({
        ...prev,
        memberSize: newValue[0],  // SliderInput provides an array
      }));
    }
  };
  

  // retrieve all groups for view
  useEffect(() => {
    const retrieveAllGroups = async() => {
      try {
        const result = await GroupSearchApi.retrieveAllGroups();
        if(result.success) {
          setAllGroups(result.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    retrieveAllGroups();
  }, []);

  const handleSearch = async () => {
    try {
      console.log(formData);
      const result = await GroupSearchApi.searchGroups(formData);
      if(result.success) {
        setAllGroups(result.data);
      }
    } catch (error) {
      console.error("Search failed:", error.message);
    }
  };


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
            value={formData.groupName}
            onChange={handleFilterChange('groupName')}
            width="500px" 
            height="50px"         
            size="lg"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1)"
          />
          <Button colorScheme="teal" onClick={handleSearch}>Search</Button>
          <PopOver trigger={<Button size="sm" variant="outline">filter</Button>}>
            <Text>Maximum Members : </Text>
            <SliderInput value={[formData.memberSize]} maxValue={500} minValue={1} onChange={handleMemberSizeChange} />
            <HStack>
              <Text>Type </Text>
              <Input
                value={formData.type}
                onChange={handleFilterChange('type')}
              />
            </HStack>
            <HStack>
              <Text>Topics </Text>
              <Input
                value={formData.topics}
                onChange={handleFilterChange('topics')}
                placeholder="Add comma separated values"
              />
            </HStack>
          </PopOver>
  
          {/* Extract all group here */}
          <Flex
            flexWrap="wrap" 
            justify="center"
            gap={4} 
            p={4}
          >
            {allGroups.length > 0 ? (
              allGroups.map((group, index) => (
                <GroupCard
                  key={index} 
                  group={group}
                  isUserInGroup={true}
                />
              ))
            ) : (
              <Box p={2}>No Groups</Box>
            )}
          </Flex>
          
        </VStack>
      
    </PageLayout>
  );
  
  
  
};

export default MainPage;
