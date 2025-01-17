"use client"

import { createListCollection } from "@chakra-ui/react"
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../ui/select";



const CustomSelect = ({ onChange, items, label, placeholder, isMultiple = false, size = "sm", width = "320px" }) => {
    const collection = createListCollection({ items });

  
    return (
      <SelectRoot 
        onValueChange={(e) => onChange(e.value)} 
        multiple={isMultiple} 
        collection={collection} 
        size={size} 
        width={width}
      >
        <SelectLabel>{label}</SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem item={item} key={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    );
};
  
export default CustomSelect;
  