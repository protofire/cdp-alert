var dbUri = process.env.DB_URI
if (!dbUri) {
  throw new Error('DB_URI not configured. Add it to .env')
}
const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect(
  dbUri,
  {
    useNewUrlParser: true
  }
)

var schema = new Schema({
  email: String,
  cdps: [String],
  address: String,
  min: Number,
  max: Number,
  createdAt: Date
})

schema.pre('save', function (next) {
  this.createdAt = new Date()
  next()
})

const Alert = mongoose.model('Alert', schema)

module.exports = Alert
