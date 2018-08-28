const mongoose = require('./connection')

const schema = new mongoose.Schema({
  lastBlockFrom: Number
})

const Event = mongoose.model('Event', schema)

module.exports = Event
