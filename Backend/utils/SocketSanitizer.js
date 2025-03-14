// **************************************************
//                 Validation Handler
// **************************************************
export const handleValidationErrors = (validations) => {
    const errors = validations
        .map(({ field, value, validator, message }) => (!validator(value) ? { field, message } : null))
        .filter(Boolean);
    
    if (errors.length > 0) {
        console.log(errors);
    }

    return errors.length > 0 ? errors : null;
};

// **************************************************
//                 Validator Functions
// **************************************************
export const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

export const validateToken = (token) => typeof token === 'string' && /^[a-f0-9]{64}$/.test(token);

export const validatePassword = (password) => typeof password === 'string' && password.length >= 5;

export const validateId = (id) => /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);

export const validateContent = (content, min = 1, max = 500, canBeEmpty = false) => {
    if (!canBeEmpty && !content) return false;
    return typeof content === 'string' && content.length >= min && content.length <= max;
};

export const validateName = (name) => validateContent(name, 3, 50);

export const validateChatType = (type) => ['text_message', 'link', 'discussion_topic', 'files', 'video_conferencing', 'join_group', 'leave_group'].includes(type);

export const validateDate = (date) => !isNaN(Date.parse(date));

export const validateRole = (role) => ['admin', 'member'].includes(role);

export const validateGroupStatus = (status) => ['public', 'private'].includes(status);

export const validateGroupSize = (size = 1) => Number.isInteger(size) && size > 0;

export const validateGroupTopics = (topics) => Array.isArray(topics);
