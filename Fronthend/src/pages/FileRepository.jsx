import React, { useState } from 'react';
import { Text, Flex, Box, VStack, HStack, Button, Icon } from '@chakra-ui/react';
import { Tooltip } from '../components/ui/tooltip';

import { BsFolderFill } from "react-icons/bs";
import { RiFolderImageFill } from "react-icons/ri";
import { SiGoogledocs } from "react-icons/si";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { MdAudioFile } from "react-icons/md";
import { RiFileVideoFill } from "react-icons/ri";
import { BsFileEarmarkZipFill } from "react-icons/bs";
import { BsFileEarmarkCodeFill } from "react-icons/bs";
import { BsFiletypeExe } from "react-icons/bs";
import { AiFillFileUnknown } from "react-icons/ai";
import { useColorModeValue } from '../components/ui/color-mode';

// File Type Categories
const ALL_FILE = 'all_files';
const IMAGE_FILE = 'image_files';
const DOCUMENT_FILE = 'document_files';
const AUDIO_FILE = 'audio_files';
const VIDEO_FILE = 'video_files';
const COMPRESSED_FILE = 'compressed_files';
const CODING_FILE = 'coding_files';
const OTHER_FILE = 'other_files'; // Includes exe, system file, db, font, CAD, 3D models


const Folder = ({ children, content = '', onClick = ()=>{} }) => {

    const folderBg = useColorModeValue('blue.100','gray.800');
    const hoverBg = useColorModeValue('blue.200', 'gray.700');
    return (
        <Tooltip openDelay={100}> 
            <Box
                width="150px"
                height="150px"
                bg={folderBg}
                borderRadius="8px"
                boxShadow="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                m={5}
                _hover={{ bg: hoverBg }}
                onClick={onClick}
            >
                <Tooltip content={content}>
                    {children}
                </Tooltip>
                
            </Box>
        </Tooltip>
    );
};


const RenderFileItems = ({ onBack = ()=>{} }) => {
    return (
        <Flex direction="column" align="center" width="80%" p={5}>
            <Text fontSize="2xl" mb={4}>
                Files
            </Text>
            {/* Placeholder bars for file items */}
            {[...Array(5)].map((_, index) => (
                <Box
                    key={index}
                    width="100%"
                    height="40px"
                    bg="gray.300"
                    borderRadius="md"
                    mb={3}
                />
            ))}
            <Button
                mt={5}
                bg="blue.500"
                color="white"
                px={4}
                py={2}
                borderRadius="md"
                onClick={onBack}
            >
                Back to Folders
            </Button>
        </Flex>
    );
};




const FileRepository = () => {
    
    const iconColor = useColorModeValue('black','white');
    const folders = [
        { content: 'All Files', icon: <BsFolderFill size={32} color={iconColor} />, type: ALL_FILE },
        { content: 'All Images', icon: <RiFolderImageFill size={32} color={iconColor} />, type: IMAGE_FILE },
        { content: 'All Documents', icon: <SiGoogledocs size={32} color={iconColor} />, type: DOCUMENT_FILE },
        { content: 'All Audio Files', icon: <MdAudioFile size={32} color={iconColor} />, type: AUDIO_FILE },
        { content: 'All Video Files', icon: <RiFileVideoFill size={32} color={iconColor} />, type: VIDEO_FILE },
        { content: 'All Compressed Files', icon: <BsFileEarmarkZipFill size={32} color={iconColor} />, type: COMPRESSED_FILE },
        { content: 'All Coding Files', icon: <BsFileEarmarkCodeFill size={32} color={iconColor} />, type: CODING_FILE },
        { content: 'Other Files', icon: <AiFillFileUnknown size={32} color={iconColor} />, type: OTHER_FILE },
    ];

    const [selectedFolder, setSelectedFolder] = useState(null);
    const handleFolderClick = (type = 'null') => {
        console.log('Folder ', type, ' is clicked');
        setSelectedFolder(type);
    };
    const handleBackToFolders  = () => {
        setSelectedFolder(null);
    };

    
    return (
        <Flex justify="center" wrap="wrap" p={50}>
        {selectedFolder ?
            <RenderFileItems onBack={handleBackToFolders}/>
            : 
            folders.map(({ content, icon, type }) => (
                <Folder key={type} content={content} onClick={() => handleFolderClick(type)}>
                    {icon}
                </Folder>
            ))}
            
        </Flex>
    );
};


export default FileRepository;