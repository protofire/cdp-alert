const uuid = require('uuid')
const mongoose = require('./connection')

const schema = new mongoose.Schema({
  email: String,
  cdps: [String],
  address: String,
  min: Number,
  max: Number,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  lastNotifiedAt: {
    type: Date,
    default: new Date('2018-01-01')
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
