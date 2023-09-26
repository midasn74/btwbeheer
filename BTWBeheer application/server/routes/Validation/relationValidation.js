const { body, validationResult } = require('express-validator');

const validateRelation = [
    body('company_id')
        .notEmpty().withMessage('A company is required')
        .isNumeric().withMessage('Company id must be a number'),
        
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

module.exports = validateRelation;