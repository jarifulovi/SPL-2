import { useState } from "react"
import { CloseButton } from "../ui/close-button"
import {
  FileInput,
  FileUploadTrigger,
  FileUploadClearTrigger,
  FileUploadLabel,
  FileUploadRoot,
} from "../ui/file-button"
import { Button } from "../ui/button"
import { InputGroup } from "../ui/input-group"
import { LuFileUp } from "react-icons/lu"
import { HiUpload } from "react-icons/hi"

const UploadFile = ({ text, accepts, onSetFile, onClearFile }) => {


    return (
        <FileUploadRoot 
            gap="1" 
            maxWidth="300px" 
            accept={accepts} 
            onFileAccept={onSetFile}
            
            >
            {text && <FileUploadLabel>{text}</FileUploadLabel>}
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
                        onClick={onClearFile}
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