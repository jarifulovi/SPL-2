import Fetch from "../utils/Fetch";

// utils/api.js
const registerUser = async (formData) => {
    return await Fetch.fetchData('http://localhost:3000/register', 'POST', formData);
};

const loginUser = async (formData) => {
    return await Fetch.fetchData('http://localhost:3000/login', 'POST', formData, true);
};

const isAuthenticated = async (email) => {
    return await Fetch.fetchData('http://localhost:3000/isAuthenticated', 'POST', { email }, true);
};

const updatePassword = async (formData) => {
    return await Fetch.fetchData('http://localhost:3000/updatePassword','POST', formData);
}

const logOut = async (email) => {
    return await Fetch.fetchData('http://localhost:3000/logout', 'POST', { email });
};


export default {
    registerUser,
    loginUser,
    isAuthenticated,
    updatePassword,
    logOut
}
