import Fetch from "../utils/Fetch";

// utils/api.js
const registerUser = async (formData) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/register', 'POST', formData);
};

const loginUser = async (formData) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/login', 'POST', formData, true);
};

const isAuthenticated = async (email) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/isAuthenticated', 'POST', { email }, true);
};

const updatePassword = async (formData) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/updatePassword','POST', formData);
}

const logOut = async (email) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/logout', 'POST', { email });
};

const forgotPassword = async (email) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/forgotPassword', 'POST', { email });
};

const resetPassword = async (formData) => {
    return await Fetch.fetchData(Fetch.baseUrl + '/resetPassword', 'POST', { email: formData.email, newPassword: formData.new_password, token: formData.token });
};


export default {
    registerUser,
    loginUser,
    isAuthenticated,
    updatePassword,
    logOut,
    forgotPassword,
    resetPassword,
}
