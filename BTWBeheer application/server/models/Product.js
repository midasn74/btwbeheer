const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Product = sequelize.define('products', { 
        product_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        company_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'companies',
                key: 'company_id',
            },
        },
        invoice_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'invoices',
                key: 'invoice_id',
            },
        },
        quotation_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'quotations',
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

    return Product;
};
