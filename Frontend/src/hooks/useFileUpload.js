import { useState, useContext } from 'react';
import FileApi from '../services/FileApi';
import Fetch from '../utils/Fetch';
import { toaster } from '../components/ui/toaster';
import { SocketContext } from '../utils/SocketContext';


export const acceptsObj = {
  image: ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml", "image/x-icon"],
  audio: ["audio/mpeg", "audio/ogg", "audio/wav", "audio/webm"],
  video: ["video/mp4", "video/webm"],
  documents: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "text/plain"
  ],
  compressed: ["application/zip", "application/gzip"],
  coding: [
      "text/javascript",
      "text/html",
      "text/css",
      "application/json",
      "application/xml",
      "text/x-python",
      "text/x-java-source",
      "text/x-c",
      "text/x-c++",
      "text/x-php",
      "text/x-shellscript"
  ],
  other: ["application/octet-stream"]
};

const accepts = Object.values(acceptsObj).flat();


const useFileUpload = () => {
  const user_id = localStorage.getItem('user_id');
  const name = localStorage.getItem('name');
  const [file, setFile] = useState(null);
  const [fileDescription, setFileDescription] = useState('');
  const { onEvent, offEvent, emitEvent } = useContext(SocketContext);

  const setFileUpload = (file) => {
    setFile(file);
  };

  const onClearFile = () => {
    setFile(null);
    setFileDescription('');
  };

  const emitFileUploaded = (group, file_id) => {
    const fileMetadata = {
      file_id: file_id,
      file_name: file.files[0].name,
      file_description: fileDescription,
      file_type: file.files[0].type,
      file_size: file.files[0].size,
      uploaded_by: user_id,
      group_id: group.group_id,
    }
    emitEvent('fileUploaded', group.group_id, user_id, fileMetadata, name, group.group_name);
  }

  const handleFileUpload = async (group) => {
    if (file && group) {
      setFile(null);
      setFileDescription('');
      let result = null;

      try {
        result = await FileApi.uploadFile(file.files[0], user_id, group.group_id);
        
        if (result.success) {
          if(result.isUploaded) {
            const { signedUrl } = result.data;
            const awsResponse = await FileApi.uploadToAws(signedUrl, file.files[0]);
            if (awsResponse.ok) {
              toaster.create({
                title: 'File uploaded successfully',
                type: 'success',
              });
            } else {
              toaster.create({
                title: 'File upload failed',
                type: 'error',
              });
            }
          } else {
            toaster.create({
              title: 'File uploaded successfully',
              type: 'success',
            });
          }
          
        }
      } catch (error) {
        console.error(error.message);
        toaster.create({
          title: 'File upload failed',
          type: 'error',
        });
      }
      emitFileUploaded(group, result.data.file_id);
    }
  };


  return {
    file,
    fileDescription,
    setFileDescription,
    setFileUpload,
    onClearFile,
    handleFileUpload,
    accepts,
  };
};

export default useFileUpload;