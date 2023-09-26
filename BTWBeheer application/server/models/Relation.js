const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Relation = sequelize.define('relations', { 
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
                model: 'companies',
                key: 'company_id',
            },
        },
    });

    return Relation;
};