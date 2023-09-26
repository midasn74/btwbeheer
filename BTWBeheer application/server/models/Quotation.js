const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Quotation = sequelize.define('quotations', { 
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
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true,
            },
        },
    });

   return Quotation;
};
