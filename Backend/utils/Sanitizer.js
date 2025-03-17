import { body, cookie, validationResult } from 'express-validator';

export const handleValidationErrors = (name, doesConsole = true) => (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if(doesConsole) {
            console.error(`${name} : Validation errors:`, errors.array());
        }
        return res.status(400).json({ success: false, message: 'Invalid input' });
    }
    next();
};

// **************************************************
//                 Validators functions
// **************************************************
export const validateEmail = body('email').isEmail().withMessage('Invalid email format').normalizeEmail();

export const validateTokenInCookie = (arg) => cookie(arg)
  .notEmpty().withMessage(`${arg} is required`)
  .isLength({ min: 64, max: 64 }).withMessage(`${arg} must be 64 characters long`)
  .matches(/^[a-f0-9]{64}$/).withMessage(`${arg} must be a valid session token`);

export const validateTokenInBody = (arg) => body(arg)
  .notEmpty().withMessage(`${arg} is required`)
  .isLength({ min: 64, max: 64 }).withMessage(`${arg} must be 64 characters long`)
  .matches(/^[a-f0-9]{64}$/).withMessage(`${arg} must be a valid session token`);


export const validatePassword = (arg) => 
    body(arg).isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
        .trim().escape();

export const validateId = (arg) => 
    body(arg).notEmpty().withMessage(`${arg} is required`)
        .isUUID(4).withMessage(`${arg} must be a valid UUID v4`)
        .trim().escape();


// anything that is a string and can't have malicious characters
export const validateContent = (arg, min = 1, max = 500, canBeEmpty = false) => {
    const validator = body(arg).trim();

    if (!canBeEmpty) {
        validator.notEmpty().withMessage(`${arg} is required`);
    }

    return validator
        .isLength({ min, max }).withMessage(`Content must be between ${min} and ${max} characters`)
        .matches(/^[\p{L}\p{N}\p{P}\p{Zs}\p{S}]*$/u).withMessage('Invalid characters in content')
        .escape();
};

  

export const validateDate = (arg) => body(arg).isISO8601().withMessage('Invalid date format');

export const validateRole = body('role').isIn(['admin', 'member']).withMessage('Invalid role');

export const validateGroupStatus = body('group_status').isIn(['public', 'private']).withMessage('Invalid group status');

export const validateGroupSize = body('group_size').isInt({ min: 1 }).withMessage('Group size must be a positive integer');

export const validateGroupTopics = body('topics').isArray().withMessage('Topics must be an array');







