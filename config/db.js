const Poll = require('pg').Pool

const pool = new Poll({
  user: 'postgres',
  password: 'postgres',
  database: 'pgtest',
  host: 'localhost',
  min: 1,
  max: 5
})

pool.connect()
  .then(() => console.log('connect'))
  .catch(err => console.error(err))

module.exports = pool