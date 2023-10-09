const { Company } = require('../sequelize');

async function getCompanyById(companyId) {
    const company = await Company.findByPk(companyId);

    return company;
}

async function getCompanyByLoginMail(login_mail) {
    const company = await Company.findOne({ where: { login_mail } });

    return company;
}

async function createCompany({ 
        login_mail, 
        password_hash, 
        company_name, 
        contact_mail, 
        contact_phone_number, 
        bank_number, 
        kvk_number, 
        vat_number, 
        vat_declaration_interval, 
        address, 
        postal_code, 
        city, 
        country, 
        default_payment_term_days, 
        default_quotation_validity_days 
    }) 
    {
    const company = await Company.create({ 
        login_mail, 
        password_hash, 
        company_name, 
        contact_mail, 
        contact_phone_number, 
        bank_number, 
        kvk_number, 
        vat_number, 
        vat_declaration_interval, 
        address, 
        postal_code, 
        city, 
        country, 
        default_payment_term_days, 
        default_quotation_validity_days 
    });

    return company;
}

async function alterCompany({ 
    login_mail, 
    password_hash, 
    company_name, 
    contact_mail, 
    contact_phone_number, 
    bank_number, 
    kvk_number, 
    vat_number, 
    vat_declaration_interval, 
    address, 
    postal_code, 
    city, 
    country, 
    company_logo,
    default_payment_term_days, 
    default_quotation_validity_days 
}) {
    const company = await getCompanyByLoginMail(login_mail);

    company.set({ 
        login_mail, 
        password_hash, 
        company_name, 
        contact_mail, 
        contact_phone_number, 
        bank_number, 
        kvk_number, 
        vat_number, 
        vat_declaration_interval, 
        address, 
        postal_code, 
        city, 
        country, 
        company_logo,
        default_payment_term_days, 
        default_quotation_validity_days 
    });

    await company.save();

    return company;
}
  
module.exports = { getCompanyById, getCompanyByLoginMail, createCompany, alterCompany };