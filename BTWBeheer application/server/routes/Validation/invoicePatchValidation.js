const { body, validationResult } = require('express-validator');

const validateInvoice = [
    body('company_id')
        .isNumeric().withMessage('Company id must be a number'),

    body('relation_id')
        .isNumeric().withMessage('Relation id must be a number'),

    body('invoice_description')
        .isString().withMessage('Invoice description must be a string'),
    
    body('creation_date')
        .isDate().withMessage('Creation date must be a date'),
    
    body('due_date')
        .isDate().withMessage('Due date must be a date'),

    body('payment_term_days')
        .isInt({ min: 1, max: 365 }).withMessage('A valid default payment term is required (1-365) days'),
        
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

module.exports = validateInvoice;