const mongoose = require('mongoose')

const { DB_URI } = process.env

if (!DB_URI) {
  throw new Error('DB_URI not configured. Add it to .env')
}

mongoose.connect(
  DB_URI,
  {
    useNewUrlParser: true
  }
)

module.exports = mongoose
