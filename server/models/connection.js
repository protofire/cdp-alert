const dbUri = process.env.DB_URI
if (!dbUri) {
  throw new Error('DB_URI not configured. Add it to .env')
}
const mongoose = require('mongoose')

mongoose.connect(
  dbUri,
  {
    useNewUrlParser: true
  }
)

module.exports = mongoose
