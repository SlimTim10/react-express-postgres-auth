// To use:
// npm run seeddb

const fs = require('fs')
const conn = require('./conn.js')

;(async () => {

  const sql = fs.readFileSync('./db/seeds.sql').toString()
  
  try {
    await conn.query(sql)
    console.log('Database seeded!')
  } catch (e) {
    console.error('Something went wrong when seeding the database.')
    console.error(e)
  }
  
  process.exit()

})()
