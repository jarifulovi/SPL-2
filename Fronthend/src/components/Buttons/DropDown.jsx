import { Button } from "../ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../ui/menu";


const DropDown = ({ trigger, menuItems }) => {
  const handleMenuItemClick = (handler) => {
    if (handler) {
      handler();
    }
  }


  return (
    <MenuRoot>
      <MenuTrigger asChild>
        {trigger}
      </MenuTrigger>
      <MenuContent>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            value={item.value}
            onClick={() => handleMenuItemClick(item.onClick)}
            color={item.isDanger ? "fg.error" : undefined} 
            _hover={{
              bg: item.isDanger ? "bg.error" : undefined, 
              color: item.isDanger ? "fg.error" : undefined,
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  );
};

export default DropDown;

