const { body, validationResult } = require('express-validator');

const validateQuotation = [
    body('company_id')
        .isNumeric().withMessage('Company id must be a number'),

    body('relation_id')
        .isNumeric().withMessage('Relation id must be a number'),

    body('quotation_description')
        .isString().withMessage('Quotation description must be a string'),
    
    body('creation_date')
        .isDate().withMessage('Creation date must be a date'),
    
    body('valid_until')
        .isDate().withMessage('Validity date must be a date'),

    body('quotation_validity_days')
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