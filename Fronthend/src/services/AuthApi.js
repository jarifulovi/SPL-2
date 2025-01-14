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

const logOut = async (email) => {
    return await Fetch.fetchData('http://localhost:3000/logout', 'POST', { email });
};


export default {
    registerUser,
    loginUser,
    isAuthenticated,
    logOut
}
