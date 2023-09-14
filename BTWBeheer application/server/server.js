const express = require('express');
const app = express();
const port = process.env.PORT || 3001; // Choose a suitable port

require('dotenv').config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_DATABASE;

// Add your routes and middleware here

app.listen(port, () => {
  console.log(`Server is running on port ${port} database: ${dbHost}`);
});
