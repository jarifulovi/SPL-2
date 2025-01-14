import { useState } from "react"
import { CloseButton } from "../ui/close-button"
import {
  FileInput,
  FileUploadClearTrigger,
  FileUploadLabel,
  FileUploadRoot,
} from "../ui/file-button"
import { InputGroup } from "../ui/input-group"
import { LuFileUp } from "react-icons/lu"

const UploadFile = ({ text, accepts, onFileChange }) => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        // const file = event.target.files[0];
        // setSelectedFile(file);
        // if (onFileChange) {
        // onFileChange(file); // Pass the file to the parent component
        // }
        console.log("File selected");
    };

    const handleClearFile = () => {
        // setSelectedFile(null);
        // if (onFileChange) {
        // onFileChange(null); // Notify parent that the file is cleared
        // }
        console.log("File cleared");
    };


    return (
        <FileUploadRoot 
            gap="1" 
            maxWidth="300px" 
            accept={accepts} 
            onFileAccept={handleFileChange}
            
            >
            <FileUploadLabel>{text}</FileUploadLabel>
            <InputGroup
                w="full"
                startElement={<LuFileUp />}
                endElement={
                <FileUploadClearTrigger asChild>
                    <CloseButton
                    me="-1"
                    size="xs"
                    variant="plain"
                    focusVisibleRing="inside"
                    focusRingWidth="2px"
                    pointerEvents="auto"
                    color="fg.subtle"
                    onChange={handleClearFile}
                    />
                </FileUploadClearTrigger>
                }
            >
                <FileInput/>
            </InputGroup>
        </FileUploadRoot>
    )
};

export default UploadFile;
