import { Flex, Box, Text, Input, VStack, Link } from "@chakra-ui/react"

import ConditionalNavBar from "../sideBar/ConditionalBar";

const PageLayout = ({ children }) => {
    return (
        <Flex direction="column" height="100vh">
          {/* Header */}
          <Box as="header">
            <ConditionalNavBar />
          </Box>
    
          {/* Main content */}
          <Box as="main" flex="1" overflowY="auto">
            {children}
          </Box>
        </Flex>
    );
};

export default PageLayout;