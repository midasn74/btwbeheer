const express = require('express');
const router = express.Router();

const authenticateToken = require('./Authentication/tokenAuthentication');

const validateRelation = require('./Validation/relationValidation');
const validateRelationPatch = require('./Validation/relationPatchValidation');

const { Relation } = require('../sequelize');
const { Company } = require('../sequelize');

// Route to create a new relation
router.post('/', [validateRelation, authenticateToken], async (req, res) => {
    try {
        const { company_id, relation_name, relation_contact, relation_email, relation_phone, relation_address, relation_postal_code, relation_city, relation_country, relation_kvk_number, relation_vat_number, relation_iban, relation_salutation } = req.body;
    
        // Create a new relation
        const relation = await Relation.create({ 
            company_id,
            relation_name,
            relation_contact,
            relation_email,
            relation_phone,
            relation_address,
            relation_postal_code,
            relation_city,
            relation_country,
            relation_kvk_number,
            relation_vat_number,
            relation_iban,
            relation_salutation
        });
    
        res.status(200).json({ relation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to patch a relation
router.patch('/:relation_id', [validateRelationPatch, authenticateToken], async (req, res) => {
    try {
        const { relation_id } = req.params;

        // Check if the relation exists
        const relation = await Relation.findOne({ where: { relation_id } });
        if (!relation) return res.status(404).json({ error: 'Relation not found' });

        // Update the relation, only update changed parts
        await relation.update(req.body);

        // Respond with the updated relation
        res.status(200).json({ relation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to delete a relation
router.delete('/:relationId', authenticateToken, async (req, res) => {
    try {
        const relationId = parseInt(req.params.relationId, 10);

        const relation = await Relation.findByPk(relationId);

        if (!relation) {
            return res.status(404).json({ error: 'Relation not found' });
        }

        // Check if the authenticated company has permission to access the requested relations's data
        if (req.AuthCompanyId !== relation.company_id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Fetch the relation data
        if (!relation) {
            return res.status(404).json({ error: 'Relation not found' });
        }

        // Delete the relation
        await relation.destroy();

        // Respond with 204 No Content
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to get a relation
router.get('/:relationId', authenticateToken, async (req, res) => {
    try {
        const relationId = parseInt(req.params.relationId, 10);

        const relation = await Relation.findByPk(relationId)

        if (!relation) {
            return res.status(404).json({ error: 'Relation not found' });
        }

        // Check if the authenticated company has permission to access the requested relation's data
        if (req.AuthCompanyId !== relation.company_id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Fetch the relation data
        if (!relation) {
            return res.status(404).json({ error: 'relation not found' });
        }

        // Return the relation data
        res.json(relation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to get all relations
router.get('/company/:companyId', authenticateToken, async (req, res) => {
    try {
        const companyId = parseInt(req.params.companyId, 10);

        // Check if the authenticated company has permission to access the requested company's data
        if (req.AuthCompanyId !== companyId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const company = await Company.findByPk(req.AuthCompanyId);

        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        // Fetch all relations for the company
        const relations = await Relation.findAll({ where: { company_id: companyId } });
        if (!relations || relations.length === 0) {
            return res.status(404).json({ error: `No relations found for company: ${company.company_name} (${company.company_id})` });
        }

        // Return the relations data
        res.json(relations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
