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

if (process.env.NODE_ENV === 'test') {
    const mockKnex = require('mock-knex');
    mockKnex.mock(knex);
}

module.exports = knex;