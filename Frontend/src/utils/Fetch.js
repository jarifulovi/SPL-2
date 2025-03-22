

//const baseUrl = "http://localhost:3000";
const baseUrl = "https://study-sync-backend.onrender.com";

const fetchData = async (url, method, data = null, credentials = true) => {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: data ? JSON.stringify(data) : null,
            credentials: credentials ? 'include' : 'same-origin'
        });
        
        const result = await response.json();
        
        return result;
    } catch (error) {
        console.error(`Error during ${method} request to ${url}:`, error.message);
        throw { success: false, message: `${method} request failed. Please try again later.` };
    }
};

const fetchFormData = async (url, method, formData, credentials = false) => {
    try {
        const response = await fetch(url, {
            method: method,
            body: formData,
            credentials: credentials ? 'include' : 'same-origin'
        });

        const result = await response.json();

        return result;
    } catch (error) {
        console.error(`Error during ${method} request to ${url}:`, error.message);
        throw { success: false, message: `${method} request failed. Please try again later.` };
    }
};


const fetchFile = async (signedUrl, file) => {
    try {
        const awsResponse = await fetch(signedUrl, {
            method: 'PUT',
            body: file,
            headers: {
              'Content-Type': file.type
            }
        });
        return awsResponse;
    } catch (error) {
        console.error(`Error during ${method} request to fetchFile:`, error.message);
        throw { success: false, message: `${method} request failed. Please try again later.` };
    }
    
}

export default {
    baseUrl,
    fetchData,
    fetchFormData,
    fetchFile,
}