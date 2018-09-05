const mongoose = require('./connection')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

module.exports = {
  Alert: require('./alert'),
  Cdp: require('./cdp'),
  Event: require('./event')
}
