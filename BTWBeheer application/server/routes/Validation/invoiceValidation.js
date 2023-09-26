const { body, validationResult } = require('express-validator');

const validateInvoice = [
    body('company_id')
        .notEmpty().withMessage('A company is required')
        .isNumeric().withMessage('Company id must be a number'),

    body('relation_id')
        .notEmpty().withMessage('A relation is required')
        .isNumeric().withMessage('Relation id must be a number'),

    body('invoice_description')
        .notEmpty().withMessage('An invoice description is required')
        .isString().withMessage('Invoice description must be a string'),
    
    body('creation_date')
        .notEmpty().withMessage('A creation date is required')
        .isDate().withMessage('Creation date must be a date'),
    
    body('due_date')
        .notEmpty().withMessage('A due date is required')
        .isDate().withMessage('Due date must be a date')
        .custom((value, { req }) => {
            if (value < req.body.creation_date) {
                throw new Error('Due date must be after creation date');
            }
            return true;
        }),

    body('payment_term_days')
        .notEmpty().withMessage('A payment term is required')
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