const express = require('express');
const Sequelize = require('sequelize');

// Load environment variables from .env file if the environment variables are not set
if (!process.env.DB_HOST) {
    const dotenv = require('dotenv');
    dotenv.config();
    console.log('Environment variables loaded from .env file');
}

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_DATABASE;
const secretKey = process.env.SECRET_KEY;
const jwt_expiration = process.env.JWT_EXPIRATION;
const port = process.env.PORT || 5000;

// Check if all necessary environment variables were set
if (!dbHost || !dbUser || !dbPassword || !dbName || !secretKey || !jwt_expiration) {
    throw new Error('Environment variables not set and no (complete) .env file found');
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

// Import sequelize models and sync them with the database
// Import sequelize models
const modelsToSync = ['Company', 'Relation', 'Invoice', 'Quotation', 'Product'];

for (const modelName of modelsToSync) {
const Model = require(`./models/${modelName}`);
    Model.sync({ force: false });
}

// Import routes
const routeNames = ['auth', 'companies'];

routeNames.forEach(routeName => {
  const routes = require(`./routes/${routeName}`);
  app.use(`/${routeName}`, routes);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
