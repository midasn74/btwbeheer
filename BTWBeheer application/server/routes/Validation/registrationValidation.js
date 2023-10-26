const { Company } = require('../../sequelize');
const { body, validationResult } = require('express-validator');

const isBase64 = value => /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(value);

const validateCompany = [
    // Validation rules for the request body
    body('login_mail')
        .notEmpty().withMessage('A login email address is required')
        .isEmail().withMessage('A valid login email address is required')
        .custom(async (value) => {
            const existingCompany = await Company.findOne({ where: { login_mail: value } });
            if (existingCompany) {
                throw new Error('Email is already in use');
            }
        }),

    body('password')
        .notEmpty().withMessage('A password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .isStrongPassword().withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number and one symbol'),

    body('company_name')
        .notEmpty().withMessage('A company name is required'),

    body('contact_mail')
        .notEmpty().withMessage('A contact email address is required')
        .isEmail().withMessage('A valid contact email address is required'),

    body('contact_phone_number')
        .notEmpty().withMessage('A phone number is required')
        .isMobilePhone().withMessage('A valid phone number is required'),

    body('bank_number')
        .notEmpty().withMessage('A bank account number is required')
        .isIBAN().withMessage('A valid bank account number is required'),

    body('kvk_number')
        .notEmpty().withMessage('A KVK number is required'),

    body('vat_number')
        .notEmpty().withMessage('A VAT number is required'),

    body('vat_declaration_interval')
        .notEmpty().withMessage('A VAT declaration interval is required')
        .isIn(['weekly', 'monthly', 'quarterly', 'yearly'])
            .withMessage('A valid VAT declaration interval is required (weekly, monthly, quarterly, yearly)'),

    body('address')
        .notEmpty().withMessage('An address number is required'),

    body('postal_code')
        .notEmpty().withMessage('A postal code is required')
        .isPostalCode('NL').withMessage('A valid postal code is required'),

    body('city')
        .notEmpty().withMessage('A city is required')
        .isAlpha().withMessage('A valid city is required'),

    body('country')
        .notEmpty().withMessage('A country is required')
        .isAlpha().withMessage('A valid country is required'),

    body('default_payment_term_days')
        .notEmpty().withMessage('A default payment term is required')
        .isInt({ min: 1, max: 365 }).withMessage('A valid default payment term is required (1-365) days'),

    body('default_quotation_validity_days')
        .notEmpty().withMessage('A default quotation validity term is required')
        .isInt({ min: 1, max: 365 }).withMessage('A valid default quotation validity term is required (1-365) days'),

    body('company_logo')
        .notEmpty().withMessage('A company logo is required'),

    body('company_logo').custom((value) => {
        value = value.split(',')[1];
        if (!isBase64(value)) {
            throw new Error('Company logo must be a base64 encoded image');
        }
        return true;
    }),
    
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

module.exports = validateCompany;