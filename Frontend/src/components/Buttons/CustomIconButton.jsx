import { IconButton } from "@chakra-ui/react"


const CustomIconButton = ({ children }) => {

    return (
        <IconButton 
                    bg="transparent" 
                    color="black"
                    borderRadius="full"
                    _hover={{
                    bg: "gray.200", 
                    color: "black", 
                    }}
        >
            {children}
        </IconButton>
    );
}

export default CustomIconButton;