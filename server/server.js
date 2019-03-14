require('dotenv').config(); // Load in environment variables from .env
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello!'));

app.listen(process.env.SERVER_PORT, () => console.log(`Server listening on port ${process.env.SERVER_PORT}!`));