const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Relation = sequelize.define('relations', { 
        relation_id: {
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
        relation_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        relation_contact: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        relation_email: {
            type: DataTypes.STRING,
            allowNull: false,
            validator: {
                isEmail: true,
            },
        },
        relation_phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validator: {
                isNumeric: true,
            },
        },
        relation_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        relation_postal_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        relation_city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        relation_country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        relation_kvk_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        relation_vat_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        relation_iban: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        relation_salutation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Relation;
};