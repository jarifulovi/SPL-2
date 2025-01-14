import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Flex, Box, Text, Input, VStack, Link } from "@chakra-ui/react"
import PageLayout from "../components/Others/PageLayout";


// Only accessible to admins joined in a group
const GroupOptions = () => {

  const location = useLocation();
  const navigate = useNavigate();


  const { group } = location.state || {};

  
  return (
    
    <h1>Group Options</h1>
 
  );

};

export default GroupOptions;