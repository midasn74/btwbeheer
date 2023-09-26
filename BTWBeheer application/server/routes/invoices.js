const express = require('express');
const router = express.Router();
const { Invoice } = require('../sequelize');
const authenticateToken = require('./Authentication/tokenAuthentication');
const validateInvoice = require('./Validation/invoiceValidation');

// Route to create a new invoice
router.post('/', validateInvoice, async (req, res) => {
    try {
        const {  } = req.body;
    
        // Create a new invoice
        const invoice = await Invoice.create({ 
            
        });
    
        res.status(200).json({ invoice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:invoiceId', authenticateToken, async (req, res) => {
    try {
        const invoiceId = parseInt(req.params.invoiceId, 10);

        // Check if the authenticated company has permission to access the requested company's data
        if (req.AuthCompanyId !== Invoice.findByPk(invoiceId).company_id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Fetch the company data
        const invoice = await Invoice.findByPk(invoiceId);
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        // Return the company data
        res.json(invoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
