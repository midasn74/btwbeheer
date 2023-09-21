const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateCompany = require('./middleWares/validation/company');

// Route to register a new company
router.post('/register', validateCompany, async (req, res) => {
    try {
        const { login_mail, password, company_name, contact_mail, contact_phone_number, bank_number, kvk_number, vat_number, vat_declaration_interval, address, postal_code, city, country, default_payment_term_days, default_quotation_validity_days } = req.body;
    
        // Check if the email is already registered
        const existingCompany = await Company.findOne({ where: { login_mail } });
        if (existingCompany) {
          return res.status(400).json({ error: 'Email already in use' });
        }
    
        // Hash the password
        const saltRounds = 12;
        const passwordHash = await bcrypt.hash(password, saltRounds);
    
        // Create a new company
        const company = await Company.create({ 
            login_mail, 
            password_hash: passwordHash, 
            company_name, 
            contact_mail, 
            contact_phone_number, 
            bank_number, 
            kvk_number, 
            vat_number, 
            vat_declaration_interval, 
            address, 
            postal_code, 
            city, 
            country, 
            default_payment_term_days, 
            default_quotation_validity_days 
        });
    
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to login a company
router.post('/login', async (req, res) => {
    try {
        const { login_mail, password } = req.body;
    
        // Find the company by email
        const company = await Company.findOne({ where: { login_mail } });
        if (!company) {
            return res.status(401).json({ error: 'Invalid login credentials' });
        }
    
        // Compare the provided password with the stored hash
        const passwordMatch = await bcrypt.compare(password, company.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid login credentials' });
        }
    
        // Generate a JWT token for authentication
        const token = jwt.sign({ sub: company.company_id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRATION,
        });
    
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
