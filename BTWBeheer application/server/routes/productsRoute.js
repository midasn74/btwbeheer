const express = require('express');
const router = express.Router();

const authenticateToken = require('./Authentication/tokenAuthentication');
const validateProduct = require('./Validation/productValidation');
const validateProductPatch = require('./Validation/productPatchValidation');

const { getProductById, createProduct, alterProduct, deleteProduct, getProductsOfInvoice, getProductsOfQuotation } = require('../services/productService');
const { getInvoiceById } = require('../services/invoiceService');
const { getQuotationById } = require('../services/quotationService');
const { getCompanyById } = require('../services/companyService');

// Route to create a new product
router.post('/', [validateProduct, authenticateToken], async (req, res) => {
    try {
        const { company_id, invoice_id, quotation_id, product_description, quantity, price_per_unit_ex_vat, vat_percentage, discount_percentage } = req.body;
        
        if (req.AuthCompanyId !== company_id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Create a new product
        const product = await createProduct({ 
            company_id,
            invoice_id,
            quotation_id,
            product_description,
            quantity,
            price_per_unit_ex_vat,
            vat_percentage,
            discount_percentage
        });

        res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to patch a product
router.patch('/:productId', [validateProductPatch, authenticateToken], async (req, res) => {
    try {
        const productId = req.params.productId;

        // Check if the product exists
        const product = await getProductById(productId);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        // Update the product, only update changed parts
        Object.keys(req.body).forEach(key => {
            product[key] = req.body[key];
        });
        await alterProduct(productId, product);

        // Respond with the updated product
        res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to delete a product
router.delete('/:productId', authenticateToken, async (req, res) => {
    try {
        const productId = req.params.productId;

        const product = await getProductById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Check if the authenticated company has permission to access the requested product's data
        if (req.AuthCompanyId !== product.company_id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Fetch the product data
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Delete the product
        await deleteProduct(productId);

        // Respond with 204 No Content
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to get a product
router.get('/:productId', authenticateToken, async (req, res) => {
    try {
        const productId = req.params.productId;

        const product = await getProductById(productId)

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Check if the authenticated company has permission to access the requested product's data
        if (req.AuthCompanyId !== product.company_id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Fetch the product data
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Return the product data
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to get all products of a invoice
router.get('/invoices/:invoiceId', authenticateToken, async (req, res) => {
    try {
        const invoiceId = req.params.invoiceId;

        const invoice = await getInvoiceById(invoiceId);

        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        // Check if the authenticated company has permission to access the requested product's data
        if (req.AuthCompanyId !== invoice.company_id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Fetch all products for the invoice
        const products = await getProductsOfInvoice(invoiceId);
        if (!products || products.length === 0) {
            return res.status(404).json({ error: `No products found for invoice: ${invoice.invoice_id}` });
        }

        // Return the products data
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to get all products of a quotation
router.get('/quotations/:quotationId', authenticateToken, async (req, res) => {
    try {
        const quotationId = req.params.quotationId;

        const quotation = await getQuotationById(quotationId);

        if (!quotation) {
            return res.status(404).json({ error: 'Quotation not found' });
        }

        // Check if the authenticated company has permission to access the requested product's data
        if (req.AuthCompanyId !== quotation.company_id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Fetch all products for the quotation
        const products = await getProductsOfQuotation(quotationId);
        if (!products || products.length === 0) {
            return res.status(404).json({ error: `No products found for quotation: ${quotation.quotation_id}` });
        }

        // Return the products data
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
