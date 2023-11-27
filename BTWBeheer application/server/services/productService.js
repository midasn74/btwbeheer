const { Product } = require('../sequelize');

async function getProductById(productId) {
    const product = await Product.findByPk(productId);

    return product;
}

async function createProduct({ 
    product_id,
    company_id,
    invoice_id,
    quotation_id,
    product_description,
    quantity,
    price_per_unit_ex_vat,
    vat_percentage,
    discount_percentage
}) {
    const product = await Product.create({ 
        product_id,
        company_id,
        invoice_id,
        quotation_id,
        product_description,
        quantity,
        price_per_unit_ex_vat,
        vat_percentage,
        discount_percentage
    });

    return product;
}

async function alterProduct(productId, { 
    product_id,
    company_id,
    invoice_id,
    quotation_id,
    product_description,
    quantity,
    price_per_unit_ex_vat,
    vat_percentage,
    discount_percentage
}) {
    const product = await getProductById(productId);

    product.set({ 
        product_id,
        company_id,
        invoice_id,
        quotation_id,
        product_description,
        quantity,
        price_per_unit_ex_vat,
        vat_percentage,
        discount_percentage
    });

    await product.save();

    return product;
}

async function deleteProduct(productId) {
    const product = await getProductById(productId);

    await product.destroy();
}

async function getProductsOfInvoice(invoiceId) {
    const products = await Product.findAll({ where: { invoice_id: invoiceId } });

    return products;
}

async function getProductsOfQuotation(quotationId) {
    const products = await Product.findAll({ where: { quotation_id: quotationId } });

    return products;
}

module.exports = { getProductById, createProduct, alterProduct, deleteProduct, getProductsOfInvoice, getProductsOfQuotation };