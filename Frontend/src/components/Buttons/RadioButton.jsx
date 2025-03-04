
import { HStack } from "@chakra-ui/react"
import { Radio, RadioGroup } from "../ui/radio"
import { useState, useEffect } from "react"


const RadioButton = ({ value, onChange, items }) => {

    return (
      <RadioGroup 
        value={value} 
        onValueChange={(e) => onChange(e.value)}
        colorPalette='teal'
      >
        <HStack gap="6">
          {items.map((item) => (
            <Radio key={item.value} value={item.value}>
              {item.label}
            </Radio>
          ))}
        </HStack>
      </RadioGroup>
    )
};

export default RadioButton;