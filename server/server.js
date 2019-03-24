require('dotenv').config(); // Load in environment variables from .env
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/api', require('./route/mainRoute'));
// Route everything that isn't defined to frontend build directory
app.get('/*', express.static('build'));

app.listen(process.env.SERVER_PORT, () => console.log(`Server listening on port ${process.env.SERVER_PORT}!`));