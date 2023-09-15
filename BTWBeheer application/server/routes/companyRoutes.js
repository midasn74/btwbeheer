const express = require('express');
const router = express.Router();
const Company = require('../models/Company'); // Import your Company model

// Route to add a new company
router.post('/add', async (req, res) => {
    const company = req.body;
    await Company.create(company);
    res.json(company);
});

// Route to get all companies
router.get('/getall', async (req, res) => {
    try {
        // Retrieve all companies from the database
        const companies = await Company.findAll();

        res.status(200).json({ companies });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching companies' });
    }
});

module.exports = router;
