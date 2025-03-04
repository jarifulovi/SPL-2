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

import FolderItem from '../components/Others/FolderItem';
import RenderFileItems from '../components/Others/RenderFileItems';


// File Type Categories
const ALL_FILE = 'all_files';
const IMAGE_FILE = 'image_files';
const DOCUMENT_FILE = 'document_files';
const AUDIO_FILE = 'audio_files';
const VIDEO_FILE = 'video_files';
const COMPRESSED_FILE = 'compressed_files';
const CODING_FILE = 'coding_files';
const OTHER_FILE = 'other_files'; // Includes exe, system file, db, font, CAD, 3D models



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
            <RenderFileItems 
                onBack={handleBackToFolders} 
                selectedFolder={selectedFolder}
            />
            : 
            folders.map(({ content, icon, type }) => (
                <FolderItem key={type} content={content} onClick={() => handleFolderClick(type)}>
                    {icon}
                </FolderItem>
            ))}
            
        </Flex>
    );
};


export default FileRepository;