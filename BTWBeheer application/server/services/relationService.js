const { Relation } = require('../sequelize');

async function getRelationById(relationId) {
    const relation = await Relation.findByPk(relationId);

    return relation;
}

async function createRelation({ 
    company_id,
    relation_name,
    relation_contact,
    relation_email,
    relation_phone,
    relation_address,
    relation_postal_code,
    relation_city,
    relation_country,
    relation_kvk_number,
    relation_vat_number,
    relation_iban,
    relation_salutation
}) {
    const relation = await Relation.create({ 
        company_id,
        relation_name,
        relation_contact,
        relation_email,
        relation_phone,
        relation_address,
        relation_postal_code,
        relation_city,
        relation_country,
        relation_kvk_number,
        relation_vat_number,
        relation_iban,
        relation_salutation
    });

    return relation;
}

async function alterRelation(relationId, { 
    company_id,
    relation_name,
    relation_contact,
    relation_email,
    relation_phone,
    relation_address,
    relation_postal_code,
    relation_city,
    relation_country,
    relation_kvk_number,
    relation_vat_number,
    relation_iban,
    relation_salutation
}) {
    const relation = await getRelationById(relationId);

    relation.set({ 
        company_id,
        relation_name,
        relation_contact,
        relation_email,
        relation_phone,
        relation_address,
        relation_postal_code,
        relation_city,
        relation_country,
        relation_kvk_number,
        relation_vat_number,
        relation_iban,
        relation_salutation
    });

    await relation.save();

    return relation;
}

async function deleteRelation(relationId) {
    const relation = await getRelationById(relationId);

    await relation.destroy();
}

async function getRelationsOfCompany(companyId) {
    const relations = await Relation.findAll({ where: { company_id: companyId } });

    return relations;
}

module.exports = { getRelationById, createRelation, alterRelation, deleteRelation, getRelationsOfCompany };