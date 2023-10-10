const { Invoice } = require('../sequelize');

async function getInvoiceById(invoiceId) {
    const invoice = await Invoice.findByPk(invoiceId);

    return invoice;
}

async function createInvoice({ 
    company_id,
    relation_id,
    invoice_description,
    creation_date,
    due_date,
    payment_term_days
}) {
    const invoice = await Invoice.create({ 
        company_id,
        relation_id,
        invoice_description,
        creation_date,
        due_date,
        payment_term_days
    });

    return invoice;
}

async function alterInvoice(invoiceId, { 
    company_id,
    relation_id,
    invoice_description,
    creation_date,
    due_date,
    payment_term_days
}) {
    const invoice = await getInvoiceById(invoiceId);

    invoice.set({ 
        company_id,
        relation_id,
        invoice_description,
        creation_date,
        due_date,
        payment_term_days
    });

    await invoice.save();

    return invoice;
}

async function deleteInvoice(invoiceId) {
    const invoice = await getInvoiceById(invoiceId);

    await invoice.destroy();
}

async function getInvoicesOfCompany(companyId) {
    const invoices = await Invoice.findAll({ where: { company_id: companyId } });

    return invoices;
}

module.exports = { getInvoiceById, createInvoice, alterInvoice, deleteInvoice, getInvoicesOfCompany };