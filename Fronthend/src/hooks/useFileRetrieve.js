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


    const handleFileClick = async (file) => {
        const result = await FileApi.getFileUrl(file.file_id);
        window.open(result.data.fileUrl, '_blank');
    };

    const handleDownload = async (file) => {
        const result = await FileApi.getFileUrl(file.file_id);
        const link = document.createElement('a');
        link.href = result.data.fileUrl;
        link.download = file.file_name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return {
        files,
        setFiles,
        filteredFiles,
        handleFileClick,
        handleDownload
    };
}

export default useFileRetrieve;