const mongoose = require('./connection')

const schema = new mongoose.Schema({
  cdpId: Number,
  ownerAddress: String,
  borrowedDai: Number,
  lockedEth: Number,
  liquidationPrice: Number,
  collateralizationRatio: Number
})

const Cdp = mongoose.model('Cdp', schema)

module.exports = Cdp
