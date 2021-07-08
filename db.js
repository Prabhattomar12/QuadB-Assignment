const Pool = require('pg').Pool;
 require('dotenv').config();

 const pool = new Pool({
    user: process.env.USERDB,
    password: process.env.PASSWORD,
    host: 'localhost',
    port: '5432',
    database: 'hodlinfo',
})

module.exports = pool;