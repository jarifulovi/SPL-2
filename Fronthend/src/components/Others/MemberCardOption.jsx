import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import { IoPersonRemoveSharp } from "react-icons/io5";
import { Button } from "../ui/button"
import { Flex, Box, Text, Input, VStack, HStack, IconButton } from "@chakra-ui/react"
import { useColorModeValue } from "../ui/color-mode";
import { toaster } from "../ui/toaster";

import MemberItem from "../Others/MemberItem";
import CustomDialog from "../Buttons/CustomDialog";



const MemberCardOption = ({ member, onMakeAdmin, onRemoveMember }) => {
    return (
      <HStack width="100%" justify="space-between" align="center">
        <Box flex="1">
          <MemberItem member={member} />
        </Box>
        <HStack spacing={2}>
          <CustomDialog 
            triggerButton={<Button>Make Admin</Button>}
            dialogTitle="Confirm Admin Role"
            dialogBody="Are you sure you want to make this user an admin?"
            onConfirm={onMakeAdmin}
          />
          <CustomDialog
            triggerButton={<IconButton><IoPersonRemoveSharp /></IconButton>}
            dialogTitle="Confirm remove member"
            dialogBody={`Are you sure you want to remove ${member.name} from the group?`}
            onConfirm={onRemoveMember}
          />
          
        </HStack>
      </HStack>
    );
};


export default MemberCardOption;