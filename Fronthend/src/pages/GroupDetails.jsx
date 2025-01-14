import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Flex, Box, Text, Input, VStack, Link } from "@chakra-ui/react"
import PageLayout from "../components/Others/PageLayout";
import GroupCard from "../components/Others/GroupCard";



const GroupDetails = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const { group } = location.state || {};
  console.log(group);



  return (
      <GroupCard
        group={group}
        onClick={() => {}}
      />
  );
  
};

export default GroupDetails;