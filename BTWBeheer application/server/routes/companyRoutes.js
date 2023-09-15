const express = require('express');
const router = express.Router();
const Company = require('../models/Company'); // Import your Company model

// Route to add a new company
router.post('/', async (req, res) => {
    try {
        const company = req.body;
        await Company.create(company);
        res.status(200).json({ company });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching companies' });
    }
});

// Route to get all companies
router.get('/', async (req, res) => {
    try {
        // Retrieve all companies from the database
        const companies = await Company.findAll();

        res.status(200).json({ companies });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching companies' });
    }
});

// Route to get single company
router.get('/:companyId', async (req, res) => {
    try {
    // Extract the company ID from the request parameters
    const companyId = req.params.companyId;

    // Retrieve the company from the database by its ID
    const company = await Company.findByPk(companyId);

    if (!company) {
        // If the company with the given ID is not found, return a 404 response
        return res.status(404).json({ message: 'Company not found' });
    }

    // Return the retrieved company as JSON response
    res.status(200).json({ company });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching company' });
    }
});
  

module.exports = router;
