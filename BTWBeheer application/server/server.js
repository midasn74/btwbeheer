const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const dotenv = require('dotenv');

// Load environment variables from a .env file if not already set
if (!process.env.DB_HOST) {
  dotenv.config();
  console.log('Environment variables loaded from .env file');
}

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_DATABASE;

if (!dbHost || !dbUser || !dbPassword || !dbName) {
  throw new Error('Environment variables not set and no .env file found');
}

// Add your routes and middleware here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
