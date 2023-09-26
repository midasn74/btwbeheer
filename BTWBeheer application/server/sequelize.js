const { Sequelize } = require('sequelize');

const defineCompany = require('./models/Company');
const defineRelation = require('./models/Relation');
const defineInvoice = require('./models/Invoice');
const defineQuotation = require('./models/Quotation');
const defineProduct = require('./models/Product');

// Create a Sequelize instance with your credentials
const sequelize = new Sequelize(
    process.env.DB_DATABASE, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: console.log,
    }
);

// Connect to the database and sync the models
sequelize
.authenticate()
.then(() => {
    console.log('Database connection has been established successfully.');
})
.catch((err) => {
    console.error('Unable to connect to the database:', err);
})

// Define the models
const Company = defineCompany(sequelize);
const Relation = defineRelation(sequelize);
const Invoice = defineInvoice(sequelize);
const Quotation = defineQuotation(sequelize);
const Product = defineProduct(sequelize);

sequelize.sync()
.then(() => {
    console.log('All models were synchronized successfully.');
})
.catch((err) => {
    console.error('Unable to synchronize the models:', err);
});

module.exports = {
    sequelize,
    Company,
    Relation,
    Invoice,
    Quotation,
    Product
} 