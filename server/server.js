require('dotenv').config(); // Load in environment variables from .env
const express = require('express');
const app = express();

// Initializing knex
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'whats_for_dinner',
    }
});

app.get('/', (req, res) => res.send('Hello!'));

app.listen(process.env.SERVER_PORT, () => console.log(`Server listening on port ${process.env.SERVER_PORT}!`));