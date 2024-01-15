const { body, validationResult, check } = require('express-validator');

// Custom validation function to check if either invoice_id or quotation_id is not empty
const checkIds = check('invoice_id').custom((value, { req }) => {
  const invoiceId = req.body.invoice_id;
  const quotationId = req.body.quotation_id;

  if ((!invoiceId && !quotationId) || (invoiceId && quotationId)) {
    throw new Error('Either invoice_id or quotation_id should be provided, but not both or none.');
  }

  // Validation passed
  return true;
});

const validateProduct = [
  body('company_id')
    .notEmpty().withMessage('A company is required')
    .isUUID().withMessage('Company id must be a uuid'),

  // only invoice_id or quotation_id is required, not both, not none.
  body('invoice_id').optional(),
  body('quotation_id').optional(),
  checkIds, // Include your custom validation function here

  // Continue with other validations
  body('product_description')
    .notEmpty().withMessage('A product description is required')
    .isString().withMessage('Product description must be a string'),

  body('quantity')
    .notEmpty().withMessage('A quantity is required')
    .isInt().withMessage('Quantity must be an integer'),

  body('price_per_unit_ex_vat')
    .notEmpty().withMessage('A price per unit ex vat is required')
    .isDecimal().withMessage('Price per unit ex vat must be a decimal'),

  body('vat_percentage')
    .notEmpty().withMessage('A vat percentage is required')
    .isDecimal().withMessage('Vat percentage must be a decimal'),

  body('discount_percentage')
    .notEmpty().withMessage('A discount percentage is required')
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
