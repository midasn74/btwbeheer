const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Invoice = sequelize.define('invoices', { 
        invoice_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'companies',
                key: 'company_id',
            },
        },
        relation_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'relations',
                key: 'relation_id',
            },
        },
        invoice_description: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        creation_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        payment_term_days: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true,
            },
        },
    });

    return Invoice;
};
