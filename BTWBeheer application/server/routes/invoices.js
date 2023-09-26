const express = require('express');
const router = express.Router();
const { Invoice } = require('../sequelize');
const authenticateToken = require('./Authentication/tokenAuthentication');
const validateInvoice = require('./Validation/invoiceValidation');
const validateInvoicePatch = require('./Validation/invoicePatchValidation');
const { Company } = require('../sequelize');

// Route to create a new invoice
router.post('/', [validateInvoice, authenticateToken], async (req, res) => {
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

router.patch('/:invoiceId', [validateInvoicePatch, authenticateToken], async (req, res) => {
    try {
        const invoiceId = parseInt(req.params.invoiceId, 10);

        // Check if the authenticated company has permission to access the requested invoice's data
        if (req.AuthCompanyId !== Invoice.findByPk(invoiceId).company_id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Fetch the invoice data
        const invoice = await Invoice.findByPk(invoiceId);
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        // Patch the invoice
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:invoiceId', authenticateToken, async (req, res) => {
    try {
        const invoiceId = parseInt(req.params.invoiceId, 10);

        // Check if the authenticated company has permission to access the requested invoice's data
        if (req.AuthCompanyId !== Invoice.findByPk(invoiceId).company_id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Fetch the invoice data
        const invoice = await Invoice.findByPk(invoiceId);
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        // Return the invoice data
        res.json(invoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:invoiceId', authenticateToken, async (req, res) => {
    try {
        const invoiceId = parseInt(req.params.invoiceId, 10);

        // Check if the authenticated company has permission to access the requested invoice's data
        if (req.AuthCompanyId !== Invoice.findByPk(invoiceId).company_id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Fetch the invoice data
        const invoice = await Invoice.findByPk(invoiceId);
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        // Delete the invoice
        await invoice.destroy();

        // Respond with 204 No Content
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/company/:companyId', authenticateToken, async (req, res) => {
    try {
        const companyId = parseInt(req.params.companyId, 10);

        // Check if the authenticated company has permission to access the requested company's data
        if (req.AuthCompanyId !== companyId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const company = await Company.findByPk(req.AuthCompanyId);

        // Fetch all invoices for the company
        const invoices = await Invoice.findAll({ where: { company_id: companyId } });
        if (!invoices || invoices.length === 0) {
            return res.status(404).json({ error: `No invoices found for company: ${company.company_name} (${company.company_id})` });
        }

        // Return the invoices data
        res.json(invoices);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
