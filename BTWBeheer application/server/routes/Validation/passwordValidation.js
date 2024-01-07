const { body, validationResult } = require('express-validator');

const validatePassword = [
    body('new_password')
        .notEmpty().withMessage('A new password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .isStrongPassword().withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number and one symbol'),

    // After defining validation rules, handle the route logic
    (req, res, next) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // If validation passes, proceed to the route handler
        next();
    }
];

module.exports = validatePassword;