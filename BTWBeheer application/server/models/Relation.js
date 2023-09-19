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
const Relation = sequelize.define('Relation', { 
    relation_id: {
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
});

module.exports = Relation;
