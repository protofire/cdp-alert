var dbUri = process.env.DB_URI
if (!dbUri) {
  throw new Error('DB_URI not configured. Add it to .env')
}
const uuid = require('uuid')
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
  createdAt: {
    type: Date,
    default: Date.now()
  },
  disabled: {
    type: Boolean,
    default: false
  },
  secret: {
    type: String,
    default: uuid()
  }
})

schema.options.toJSON = {
  transform: function (doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
}
const Alert = mongoose.model('Alert', schema)

module.exports = Alert
