const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Company = sequelize.define('companies', { 
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        login_mail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact_mail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        contact_phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true,
            },
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
            defaultValue: 'quarterly', // weekly, monthly, quarterly, yearly
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
        company_logo: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        },
        default_payment_term_days: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 14,
            validate: {
                min: 0,
            },
        },
        default_quotation_validity_days: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 30,
            validate: {
                min: 0,
            },
        },
    });

    return Company;
};