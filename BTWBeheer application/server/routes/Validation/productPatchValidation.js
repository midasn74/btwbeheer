const { body, validationResult } = require('express-validator');

const validateProduct = [
    body('company_id')
        .isEmpty().withMessage('Company id must be empty'),

    // only invoice_id or quotation_id is required, not both, not none.
    body('invoice_id').isEmpty().withMessage('Invoice id must be empty'),
    body('quotation_id').isEmpty().withMessage('Quotation id must be empty'),
    
    body('product_description')
        .optional()
        .isString().withMessage('Product description must be a string'),
    
    body('quantity')
        .optional()
        .isInt().withMessage('Quantity must be an integer'),

    body('price_per_unit_ex_vat')
        .optional()
        .isDecimal().withMessage('Price per unit ex vat must be a decimal'),
    
    body('vat_percentage')
        .optional()
        .isDecimal().withMessage('Vat percentage must be a decimal'),
    
    body('discount_percentage')
        .optional()
        .isDecimal().withMessage('Discount percentage must be a decimal'),
        
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

module.exports = validateProduct;