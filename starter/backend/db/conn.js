const Pool = require('pg').Pool

const pool = new Pool({
  user: 'auth_example',
  password: '1234',
  host: 'localhost',
  database: 'auth_example',
  port: 5432,
})

module.exports = pool
