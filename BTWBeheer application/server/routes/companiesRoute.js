/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Routes related to company data
 * /companies/{companyId}:
 *   get:
 *     summary: Get company data by ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         description: ID of the company to retrieve
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Company data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       403:
 *         description: Access denied
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Company not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 *
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       properties:
 *         # Define properties for the company object
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *     ServerError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

const express = require('express');
const router = express.Router();

const authenticateToken = require('./Authentication/tokenAuthentication');

const { getCompanyById } = require('../services/companyService');

router.get('/:companyId', authenticateToken, async (req, res) => {
    try {
        const companyId = req.params.companyId;

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
