import { Button } from '@chakra-ui/react';


const SubmitButton = ({ children, ...props }) => {
    return (
      <Button
        type="submit"
        mt={4}
        colorScheme="teal"
        width="100%"
        bg="linear-gradient(115deg, #56d8e4 10%, #9f01ea 90%)" // Button gradient
        color="white"
        fontSize="xl"
        _hover={{
          bg: "linear-gradient(115deg, #9f01ea 10%, #56d8e4 90%)",
          opacity: 0.9,
        }}
        sx={{
          transition: "background 0.8s, opacity 0.3s"
        }}
        {...props}
      >
        {children}
      </Button>
    );
}


export default SubmitButton;