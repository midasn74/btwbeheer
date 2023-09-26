const express = require('express');
const router = express.Router();

const authenticateToken = require('./Authentication/tokenAuthentication');

const { Relation } = require('../sequelize');
const { Company } = require('../sequelize');

// Route to create a new relation
// Route to patch a relation
// Route to delete a relation
// Route to get a relation
// Route to get all relations

module.exports = router;
