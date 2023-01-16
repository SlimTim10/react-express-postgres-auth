// To use:
// npm run builddb

const fs = require('fs')
const conn = require('./conn.js')

;(async () => {

  const sql = fs.readFileSync('./db/schema.sql').toString()
  
  try {
    await conn.query(sql)
    console.log('Database schema built!')
  } catch (e) {
    console.error('Something went wrong when building the database.')
    console.error(e)
  }
  
  process.exit()

})()
