import { Flex, Text, Spinner } from '@chakra-ui/react';


const CustomSpinner = ({ text }) => {

    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            height="100vh"
            direction="column"
        >
            <Spinner size="xl" color="blue.500" borderWidth="4px" />
            {text && (
                <Text mt={4} fontSize="lg" color="gray.600">
                    {text}
                </Text>
            )}
        </Flex>
    );
};

export default CustomSpinner;