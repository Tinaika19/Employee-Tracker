// db/connection.js
const { Pool } = require('pg');

// Configure your connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'company_db',
    password: 'Jungkook19!',
    port: 5432,
});

module.exports = pool;
