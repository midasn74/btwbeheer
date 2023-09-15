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
const Company = sequelize.define('Company', {
  business_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  business_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_mail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bank_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kvk_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vat_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vat_declaration_interval: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postal_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  default_payment_term_days: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  default_quotation_validity_days: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Company;
