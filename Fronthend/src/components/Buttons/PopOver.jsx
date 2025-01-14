import { Input, Text, VStack, Flex, Icon } from "@chakra-ui/react"
import { Button } from "../ui/button"
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover"
import { useColorModeValue } from '../ui/color-mode';

const PopOver = ({ trigger, children, width }) => {

  const backgroundColor = useColorModeValue('gray.100', 'gray.800');
  return (
    <PopoverRoot >
      <PopoverTrigger asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent width={width} bg={backgroundColor}>
        <PopoverArrow />
        <PopoverBody>
          <VStack spacing={2}>
            {children}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  )
}

export default PopOver;
