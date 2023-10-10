const express = require('express');
const router = express.Router();

const authenticateToken = require('./Authentication/tokenAuthentication');

const { getCompanyById } = require('../services/companyService');

router.get('/:companyId', authenticateToken, async (req, res) => {
    try {
        const companyId = parseInt(req.params.companyId, 10);

        // Check if the authenticated company has permission to access the requested company's data
        if (req.AuthCompanyId !== companyId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Fetch the company data
        const company = await getCompanyById(companyId);
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        // Return the company data
        res.json(company);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
