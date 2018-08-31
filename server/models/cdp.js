const mongoose = require('./connection')

const schema = new mongoose.Schema({
  cdpId: Number,
  ownerAddress: String
})

const Cdp = mongoose.model('Cdp', schema)

module.exports = Cdp
