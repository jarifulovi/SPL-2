
import { useColorMode } from '../ui/color-mode';
import { Switch } from '../ui/switch';


const ColorModeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <header>
            <Switch 
                onChange={toggleColorMode} 
                checked={colorMode === "dark"}
            />
        </header>
    );
};

export default ColorModeToggle;

