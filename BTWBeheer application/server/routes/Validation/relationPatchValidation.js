const { body, validationResult } = require('express-validator');

const validateRelation = [
    body('company_id')
        .optional() 
        .isNumeric().withMessage('Company id must be a number'),

    body('relation_name')
        .optional() 
        .isString().withMessage('Relation name must be a string'),
    
    body('relation_contact')
        .optional() 
        .isString().withMessage('Relation contact must be a string'),

    body('relation_email')
        .optional() 
        .isEmail().withMessage('Relation email must be an email'),
    
    body('relation_phone')
        .optional() 
        .isMobilePhone('any').withMessage('Relation phone must be a phone number'),
    
    body('relation_address')
        .optional() 
        .isString().withMessage('Relation address must be a string'),

    body('relation_postal_code')
        .optional() 
        .isPostalCode('any').withMessage('Relation postal code must be a postal code'),

    body('relation_city')
        .optional() 
        .isString().withMessage('Relation city must be a string'),

    body('relation_country')
        .optional() 
        .isString().withMessage('Relation country must be a string'),

    body('relation_kvk_number')
        .optional() 
        .isString().withMessage('Relation kvk number must be a string'),

    body('relation_vat_number')
        .optional() 
        .isString().withMessage('Relation vat number must be a string'),

    body('relation_iban')
        .optional() 
        .isIBAN().withMessage('Relation iban must be an iban'),

    body('relation_salutation')
        .optional() 
        .isString().withMessage('Relation salutation must be a string'),
        
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