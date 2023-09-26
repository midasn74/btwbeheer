const { body, validationResult } = require('express-validator');

const validateRelation = [
    body('company_id')
        .isNumeric().withMessage('Company id must be a number'),

    body('relation_name')
        .isString().withMessage('Relation name must be a string'),
    
    body('relation_contact')
        .isString().withMessage('Relation contact must be a string'),

    body('relation_email')
        .isEmail().withMessage('Relation email must be an email'),
    
    body('relation_phone')
        .isMobilePhone('any').withMessage('Relation phone must be a phone number'),
    
    body('relation_address')
        .isString().withMessage('Relation address must be a string'),

    body('relation_postal_code')
        .isPostalCode('any').withMessage('Relation postal code must be a postal code'),

    body('relation_city')
        .isString().withMessage('Relation city must be a string'),

    body('relation_country')
        .isString().withMessage('Relation country must be a string'),

    body('relation_kvk_number')
        .isString().withMessage('Relation kvk number must be a string'),

    body('relation_vat_number')
        .isString().withMessage('Relation vat number must be a string'),

    body('relation_iban')
        .isIBAN().withMessage('Relation iban must be an iban'),

    body('relation_salutation')
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