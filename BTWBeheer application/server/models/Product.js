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
const Product = sequelize.define('Product', { 
    product_id: {
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
    invoice_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Invoice',
            key: 'invoice_id',
        },
    },
    quotation_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Quotation',
            key: 'quotation_id',
        },
    },
    product_description: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price_per_unit_ex_vat: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    vat_percentage: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    discount_percentage: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
});

module.exports = Product;
