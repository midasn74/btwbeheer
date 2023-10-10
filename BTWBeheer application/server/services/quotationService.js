const { Quotation } = require('../sequelize');

async function getQuotationById(quotationId) {
    const quotation = await Quotation.findByPk(quotationId);

    return quotation;
}

async function createQuotation({ 
    company_id,
    relation_id,
    quotation_description,
    creation_date,
    due_date,
    payment_term_days
}) {
    const quotation = await Quotation.create({ 
        company_id,
        relation_id,
        quotation_description,
        creation_date,
        due_date,
        payment_term_days
    });

    return quotation;
}

async function alterQuotation(quotationId, { 
    company_id,
    relation_id,
    quotation_description,
    creation_date,
    valid_until,
    quotation_validity_days
}) {
    const quotation = await getQuotationById(quotationId);

    quotation.set({ 
        company_id,
        relation_id,
        quotation_description,
        creation_date,
        valid_until,
        quotation_validity_days
    });

    await quotation.save();

    return quotation;
}

async function deleteQuotation(quotationId) {
    const quotation = await getQuotationById(quotationId);

    await quotation.destroy();
}

async function getQuotationsOfCompany(companyId) {
    const quotations = await Quotation.findAll({ where: { company_id: companyId } });

    return quotations;
}

module.exports = { getQuotationById, createQuotation, alterQuotation, deleteQuotation, getQuotationsOfCompany };