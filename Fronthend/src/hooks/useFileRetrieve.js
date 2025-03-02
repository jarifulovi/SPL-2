import { useState, useEffect } from 'react';
import { acceptsObj } from './useFileUpload';
import FileApi from '../services/FileApi';



const ALL_FILE = 'all_files';
const IMAGE_FILE = 'image_files';
const DOCUMENT_FILE = 'document_files';
const AUDIO_FILE = 'audio_files';
const VIDEO_FILE = 'video_files';
const COMPRESSED_FILE = 'compressed_files';
const CODING_FILE = 'coding_files';
const OTHER_FILE = 'other_files';

const fileTypeToMimeTypes = {
    [ALL_FILE]: Object.values(acceptsObj).flat(),
    [IMAGE_FILE]: acceptsObj.image,
    [DOCUMENT_FILE]: acceptsObj.documents,
    [AUDIO_FILE]: acceptsObj.audio,
    [VIDEO_FILE]: acceptsObj.video,
    [COMPRESSED_FILE]: acceptsObj.compressed,
    [CODING_FILE]: acceptsObj.coding,
    [OTHER_FILE]: acceptsObj.other,
};




const useFileRetrieve = (selectedFolder) => {

    const user_id = localStorage.getItem('user_id');
    const [files, setFiles] = useState([]);

    useEffect(() =>{
            const fetchFiles = async () => {
                const result  = await FileApi.retrieveAllFile(user_id);
                
                if(result.success) {
                    setFiles(result.data.allFiles);
                }
            };
            fetchFiles();
    }, []);

    const filteredFiles = files.filter(file => fileTypeToMimeTypes[selectedFolder].includes(file.file_type));


    const handleFileClick = (file) => {
        console.log('File clicked:', file);
        // fetch the url from the server
        // open the file in a new tab
    };

    return {
        files,
        setFiles,
        filteredFiles,
        handleFileClick
    };
}

export default useFileRetrieve;