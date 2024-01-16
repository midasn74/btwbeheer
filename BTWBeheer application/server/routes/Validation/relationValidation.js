const { body, validationResult } = require('express-validator');

const validateRelation = [
    body('company_id')
        .notEmpty().withMessage('A company is required')
        .isUUID().withMessage('Company id must be a uuid'),

    body('relation_name')
        .notEmpty().withMessage('A relation name is required')
        .isString().withMessage('Relation name must be a string'),
    
    body('relation_contact')
        .notEmpty().withMessage('A relation contact is required')
        .isString().withMessage('Relation contact must be a string'),

    body('relation_email')
        .notEmpty().withMessage('A relation email is required')
        .isEmail().withMessage('Relation email must be an email'),
    
    body('relation_phone')
        .notEmpty().withMessage('A relation phone is required')
        .isMobilePhone('any').withMessage('Relation phone must be a phone number'),
    
    body('relation_address')
        .notEmpty().withMessage('A relation address is required')
        .isString().withMessage('Relation address must be a string'),

    body('relation_postal_code')
        .notEmpty().withMessage('A relation postal code is required')
        .isPostalCode('any').withMessage('Relation postal code must be a postal code'),

    body('relation_city')
        .notEmpty().withMessage('A relation city is required')
        .isString().withMessage('Relation city must be a string'),

    body('relation_country')
        .notEmpty().withMessage('A relation country is required')
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
        .notEmpty().withMessage('A relation salutation is required')
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