const app = require('./app');

const port = process.env.EXPRESS_PORT || 5000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
