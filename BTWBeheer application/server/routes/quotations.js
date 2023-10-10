const express = require('express');
const router = express.Router();

const authenticateToken = require('./Authentication/tokenAuthentication');
const validateQuotation = require('./Validation/quotationValidation');
const validateQuotationPatch = require('./Validation/quotationPatchValidation');

const { getQuotationById, createQuotation, alterQuotation, deleteQuotation, getQuotationsOfCompany } = require('../services/quotationService');
const { getCompanyById } = require('../services/companyService');

// Route to create a new quotation
router.post('/', [validateQuotation, authenticateToken], async (req, res) => {
    try {
        const { company_id, relation_id, quotation_description, creation_date, valid_until, quotation_validity_days } = req.body;
    
        // Create a new quotation
        const quotation = await createQuotation({ 
            company_id,
            relation_id,
            quotation_description,
            creation_date,
            valid_until,
            quotation_validity_days
        });
    
        res.status(200).json({ quotation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.patch('/:quotationId', [validateQuotationPatch, authenticateToken], async (req, res) => {
    try {
        const quotationId = parseInt(req.params.quotationId, 10);

        const quotation = await getQuotationById(quotationId);

        if (!quotation) {
            return res.status(404).json({ error: 'Quotation not found' });
        }

        // Check if the authenticated company has permission to access the requested quotation's data
        if (req.AuthCompanyId !== quotation.company_id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Patch the quotation, only update the fields that are included in the request body
        Object.keys(req.body).forEach(key => {
            quotation[key] = req.body[key];
        });
        await alterQuotation(quotationId, quotation);

        // Respond with the updated quotation
        res.status(200).json({ quotation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:quotationId', authenticateToken, async (req, res) => {
    try {
        const quotationId = parseInt(req.params.quotationId, 10);

        const quotation = await getQuotationById(quotationId);

        if (!quotation) {
            return res.status(404).json({ error: 'Quotation not found' });
        }

        // Check if the authenticated company has permission to access the requested quotation's data
        if (req.AuthCompanyId !== quotation.company_id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Fetch the quotation data
        if (!quotation) {
            return res.status(404).json({ error: 'Quotation not found' });
        }

        // Return the quotation data
        res.json(quotation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:quotationId', authenticateToken, async (req, res) => {
    try {
        const quotationId = parseInt(req.params.quotationId, 10);

        const quotation = await getQuotationById(quotationId);

        if (!quotation) {
            return res.status(404).json({ error: 'Quotation not found' });
        }

        // Check if the authenticated company has permission to access the requested quotation's data
        if (req.AuthCompanyId !== quotation.company_id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Fetch the quotation data
        if (!quotation) {
            return res.status(404).json({ error: 'Quotation not found' });
        }

        // Delete the quotation
        await deleteQuotation(quotationId);

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

        const company = await getCompanyById(req.AuthCompanyId);

        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        // Fetch all quotations for the company
        const quotations = await getQuotationsOfCompany(companyId);
        if (!quotations || quotations.length === 0) {
            return res.status(404).json({ error: `No quotations found for company: ${company.company_name} (${company.company_id})` });
        }

        // Return the quotations data
        res.json(quotations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
