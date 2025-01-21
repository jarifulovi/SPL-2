
const invalidMessages = {
    name: "Put at-least 3 character",
    email: "Invalid Email",
    password: "Put at-least 5 character",
    confirmpassword: "Password does not match",

    // Create group
    group_name: "Put at-least 3 character",
    group_description: "Put at-least 3 character",

    // Update profile
    phone_number: "Invalid phone number",
    
};

const validateName = (name) => {
    return name.length >= 3;
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    return password.length >= 5;
};

const validatePhoneNumb = (phone_number) => {
    const phoneRegex = /^\+?[1-9]\d{9,14}$/;
    return phoneRegex.test(phone_number);
  };


const validateField = (fieldName, value, customValidation) => {
    if (!value || value.trim() === '') {
        return `${fieldName} is required`;
    }
    if (customValidation && !customValidation(value)) {
        return invalidMessages[fieldName.toLowerCase()] || `Invalid ${fieldName.toLowerCase()}`;
    }
    return '';
};

function validateForm(data, fields) {
    let errors = {};

    fields.forEach(field => {
        const error = validateField(field.name, data[field.key], field.validation);
        if (error) {
            errors[field.key] = error;
        }
    });

    return errors;
}

function validateLoginForm(data) {
    const fields = [
        { name: 'Email', key: 'email', validation: validateEmail },
        { name: 'Password', key: 'password', validation: validatePassword },
    ];
    return validateForm(data, fields);
}

function validateRegisterForm(data) {
    const fields = [
        { name: 'Name', key: 'name', validation: validateName },
        { name: 'Email', key: 'email', validation: validateEmail },
        { name: 'Password', key: 'password', validation: validatePassword },
        { name: 'ConfirmPassword', key: 'confirmPassword', validation: (value) => value === data.password }
    ];
    return validateForm(data, fields);
}


function validateCreateGroupForm(data) {
    const fields = [
        { name: 'Group_name', key: 'group_name', validation: validateName },
        { name: 'Group_description', key: 'group_description', validation: validateName }
    ];
    return validateForm(data, fields);
}


function validateUpdateProfile(data) {
    const fields = [
        { name: 'Phone_number', key: 'phone_number', validation: validatePhoneNumb },
    ];
    return validateForm(data, fields);
}

function validateChangePassword(data) {
    const fields = [
        { name: 'Password', key: 'old_password', validation: validatePassword },
        { name: 'Password', key: 'new_password', validation: validatePassword },
        { name: 'ConfirmPassword', key: 'confirmPassword', validation: (value) => value === data.new_password }
    ];
    return validateForm(data,fields);
}


// Field: 
//       name : Error message name ( can use generic name above )
//       key  : field name in the formdata ( must be same )

export default {
    validateName,
    validateEmail,
    validatePassword,
    validateLoginForm,
    validateRegisterForm,
    validateCreateGroupForm,
    validateUpdateProfile,
    validateChangePassword
}

  