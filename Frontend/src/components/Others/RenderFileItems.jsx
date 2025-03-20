import React, { useEffect, useState } from 'react';
import { Text, Flex, Box, VStack, HStack, Button, Icon, FormatByte } from '@chakra-ui/react';
import { useColorModeValue } from '../../components/ui/color-mode';

import useFileRetrieve from '../../hooks/useFileRetrieve';




const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};


const FileItem = ({ file, onClick, onDownLoad }) => {
    const bgColor = useColorModeValue('gray.100', 'gray.700');
    const hoverBgColor = useColorModeValue('gray.200', 'gray.600');
    const textColor = useColorModeValue('black', 'white');

    return (
        <Box
            width="100%"
            height="40px"
            bg={bgColor}
            borderRadius="md"
            mb={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            px={3}
            color={textColor}
            cursor="pointer"
            _hover={{ bg: hoverBgColor }}
            onClick={() => onClick(file)}
        >
            <Flex align="center" justify="space-between" width="100%">
                <Text 
                    isTruncated 
                    maxWidth="calc(100% - 200px)"   // Adjust this based on the space needed for file size, uploaded date, and button
                    whiteSpace="nowrap" 
                    overflow="hidden" 
                    textOverflow="ellipsis"
                >
                    {file.file_name}
                </Text>
                <Flex justify="flex-end" ml={3}>
                    <FormatByte value={file.file_size} />
                    <Text ml={3}>{formatDate(file.uploaded_at)}</Text>
                </Flex>
            </Flex>
            {/* <Button 
                ml={3} 
                size="sm" 
                onClick={(e) => { e.stopPropagation(); onDownLoad(file); }}
            >
                Download
            </Button> */}
        </Box>
    );
};

const RenderFileItems = ({ onBack = ()=>{}, selectedFolder }) => {
    
    const { filteredFiles, handleFileClick, handleDownload } = useFileRetrieve(selectedFolder);


    return (
        <Flex direction="column" align="center" width="80%" p={5}>
            <Text fontSize="2xl" mb={4}>
                {selectedFolder}
            </Text>
            {/* Placeholder bars for file items */}
            {filteredFiles.length > 0 ? (
                filteredFiles.map((file, index) => (
                    <FileItem 
                        key={index} 
                        file={file} 
                        onClick={handleFileClick} 
                        onDownLoad={handleDownload}
                    />
                ))
            ) : (
                <Text>No files available</Text>
            )}
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


export default RenderFileItems;
