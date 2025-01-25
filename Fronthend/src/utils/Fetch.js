

const baseUrl = "http://localhost:3000";

const fetchData = async (url, method, data = null, credentials = false) => {
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


export default {
    baseUrl,
    fetchData
}