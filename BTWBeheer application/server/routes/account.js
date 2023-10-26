const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registrationValidation = require('./Validation/registrationValidation');
const passwordValidation = require('./Validation/passwordValidation');
const authenticateToken = require('./Authentication/tokenAuthentication');

const { getCompanyById, getCompanyByLoginMail, createCompany, alterCompany } = require('../services/companyService');

// Route to register a new company
router.post('/register', registrationValidation, async (req, res) => {
    try {
        const { login_mail, password, company_name, contact_mail, contact_phone_number, bank_number, kvk_number, vat_number, vat_declaration_interval, address, postal_code, city, country, default_payment_term_days, default_quotation_validity_days, company_logo } = req.body;
    
        // Hash the password
        const saltRounds = 12;
        const password_hash = await bcrypt.hash(password, saltRounds);
    
        // Create a new company
        const company = await createCompany({ 
            login_mail, 
            password_hash, 
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
            default_quotation_validity_days,
            company_logo
        });
    
        res.status(200).json({ company });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to login a company
router.post('/login', async (req, res) => {
    try {
        const { login_mail, password } = req.body;

        if (login_mail === '' || password === '') {
            return res.status(401).json({ error: 'Please fill in all required fields' });
        }
    
        // Find the company by email
        const company = await getCompanyByLoginMail( login_mail );
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

// Route to change password
router.post('/change-password', [authenticateToken, passwordValidation], async (req, res) => {
    try {
        const company = await getCompanyById(req.AuthCompanyId);

        const { old_password, new_password } = req.body;

        // Compare the old password with the stored hash
        const passwordMatch = await bcrypt.compare(old_password, company.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid old password' });
        }
    
        // Hash the password
        const saltRounds = 12;
        const passwordHash = await bcrypt.hash(new_password, saltRounds);
    
        // Get company and change password
        company.password_hash = passwordHash;
        await alterCompany(company);

        res.status(200).json({ company });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to set the companies logo
router.post('/set-company-logo', [authenticateToken], async (req, res) => {
    try {
        const company = await getCompanyById(req.AuthCompanyId);

        const { company_logo } = req.body;

        company.company_logo = company_logo;
        await alterCompany(company);

        res.status(200).json({ company });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
