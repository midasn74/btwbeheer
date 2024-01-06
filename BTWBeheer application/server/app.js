const express = require('express');
const cors = require('cors');

bodyParser = require("body-parser"),
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
        title: "BTWBeheer Express API with Swagger",
        version: "0.1.0",
        description:
            "This is a CRUD API application made with Express and documented with Swagger",
        },
        servers: [
        {
            url: "http://localhost:5000",
        },
        ],
    },
    apis: ["./routes/*.js"],
};

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

// Check if all necessary environment variables were set
if (!dbHost || !dbUser || !dbPassword || !dbName || !secretKey || !jwt_expiration) {
    throw new Error('Environment variables not set and no (complete) .env file found');
}

const sequelize = require('./sequelize');

const app = express();
app.use(express.json({ limit: '200kb' }));
app.use(cors());

// Import routes
const routeNames = ['account', 'companies', 'invoices', 'relations', 'quotations'];

routeNames.forEach(routeName => {
  const routes = require(`./routes/${routeName}Route`);
  app.use(`/api/${routeName}`, routes);
});

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

module.exports = app ;