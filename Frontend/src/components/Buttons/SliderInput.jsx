"use client"

import { Box, Code, Stack } from "@chakra-ui/react"
import { Slider } from "../ui/slider"
import { useState } from "react"


const SliderInput = ({ value, maxValue, minValue, onChange }) => {
  

  return (
    <Box width="80%">
      <Slider
        value={value}
        max={maxValue}
        min={minValue}
        step={1}
        onValueChange={(e) => onChange(e.value)}
      />
      <Stack mt="3" gap="1">
        <Code>
          value: <b>{value}</b>
        </Code>
      </Stack>
    </Box>
  )
}


export default SliderInput;
