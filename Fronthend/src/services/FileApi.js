import Fetch from "../utils/Fetch";


const retrieveAllFile = async (user_id) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/retrieveAllFiles', 'POST', { user_id });
};

const uploadFile = async (file, user_id, group_id) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', user_id);
    formData.append('group_id', group_id);
    
    return await Fetch.fetchFormData(Fetch.baseUrl + '/uploadFile', 'POST', formData);
};

const uploadToAws = async (signedUrl, file) => {
    return await Fetch.fetchFile(signedUrl, file);
}

const getFileUrl = async (file_id) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/getFileUrl', 'POST', { file_id });
};



export default {
    retrieveAllFile,
    uploadFile,
    getFileUrl,
    uploadToAws,
};