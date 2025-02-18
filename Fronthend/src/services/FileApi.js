import Fetch from "../utils/Fetch";



const uploadFile = async (file, user_id, group_id) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', user_id);
    formData.append('group_id', group_id);

    return await Fetch.fetchData(Fetch.baseUrl + '/uploadFile', 'POST', formData);
};

const getFileUrl = async (file_id) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/getFileUrl', 'POST', { file_id });
};

const fetchFile = async (signedUrl) => {
    const response = await fetch(signedUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch the file');
    }
    return await response.blob();
};

export default {
    uploadFile,
    getFileUrl,
    fetchFile,
};