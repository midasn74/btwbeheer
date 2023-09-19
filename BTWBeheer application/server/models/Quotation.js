const { DataTypes, Sequelize } = require('sequelize');

// Establish a Sequelize connection to your database
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Define the Company model
const Quotation = sequelize.define('Quotation', { 
    quotation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Company',
            key: 'company_id',
        },
    },
    relation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Relation',
            key: 'relation_id',
        },
    },
    quotation_description: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    creation_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    valid_until: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    quotation_validity_days: {
        type: DataTypes.integer,
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
});

module.exports = Quotation;
