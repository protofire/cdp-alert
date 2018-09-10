const { Alert } = require('../models')

module.exports = {
  disableOldAlerts
}

async function disableOldAlerts (days = 60) {
  const limitDate = new Date(new Date() - days * 24 * 60 * 60 * 1000)
  const oldAlerts = await Alert.updateMany(
    {
      createdAt: {
        $lt: limitDate
      },
      disabled: false
    },
    {
      disabled: true
    }
  )

  if (oldAlerts.nModified) {
    console.log('Disabled', oldAlerts.nModified, 'old alerts')
  }

  return oldAlerts
}
