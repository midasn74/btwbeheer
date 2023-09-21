/**
* Validate the  data, and return an error object if there is any
*/

const { body, validationResult } = require('express-validator');

const validateCompany = (req, res, next) => {
    // Perform validation logic here
    // For example, you can use a validation library like 'Joi' or 'express-validator'
    // If validation fails, you can send an error response or call 'next' with an error object
    // Example with express-validator
    console.log('1');
    const { body } = req;
    console.log('2');
    req.checkBody('field1', 'Field1 is required').notEmpty();
    req.checkBody('field2', 'Field2 should be a valid email').isEmail();
    console.log('3');

    const errors = req.validationErrors();
    console.log('4');
    if (errors) {
        return res.status(400).json({ errors });
    }
    console.log('5');

    // If validation passes, proceed to the route handler
    next();
};

module.exports = validateCompany;
