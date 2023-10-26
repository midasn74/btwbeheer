const { body, validationResult } = require('express-validator');

const validateQuotation = [
    body('company_id')
        .notEmpty().withMessage('A company is required')
        .isUUID().withMessage('Company id must be a uuid'),

    body('relation_id')
        .notEmpty().withMessage('A relation is required')
        .isUUID().withMessage('Relation id must be a uuid'),

    body('quotation_description')
        .notEmpty().withMessage('An quotation description is required')
        .isString().withMessage('Quotation description must be a string'),
    
    body('creation_date')
        .notEmpty().withMessage('A creation date is required')
        .isDate().withMessage('Creation date must be a date'),
    
    body('valid_until')
        .notEmpty().withMessage('A validity date is required')
        .isDate().withMessage('Validity date must be a date')
        .custom((value, { req }) => {
            if (value < req.body.creation_date) {
                throw new Error('Validity date must be after creation date');
            }
            return true;
        }),

    body('quotation_validity_days')
        .notEmpty().withMessage('A validity term is required')
        .isInt({ min: 1, max: 365 }).withMessage('A valid validity term is required (1-365) days'),
        
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

module.exports = validateQuotation;