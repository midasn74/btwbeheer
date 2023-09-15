const express = require('express');
const Sequelize = require('sequelize');

const dotenv = require('dotenv');

// Load environment variables from .env file if the environment variables are not set
if (!process.env.DB_HOST) {
    dotenv.config();
    console.log('Environment variables loaded from .env file');
}

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_DATABASE;
const port = process.env.PORT || 5000;

// Check if all necessary environment variables were set
if (!dbHost || !dbUser || !dbPassword || !dbName) {
    throw new Error('Environment variables not set and no .env file found');
}

// Create a Sequelize instance with your credentials
const sequelize = new Sequelize(
    dbName, dbUser, dbPassword, {
        host: dbHost,
        dialect: 'mysql',
        logging: console.log,
    }
);
  
// Test the database connection
sequelize
.authenticate()
.then(() => {
    console.log('Database connection has been established successfully.');
})
.catch((err) => {
    console.error('Unable to connect to the database:', err);
});

const app = express();

app.use(express.json());

const Company = require('./models/Company'); 
Company.sync({ force: false })

const companyRoutes = require('./routes/companyRoutes');
app.use('/company', companyRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
