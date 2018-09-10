const { Alert } = require('../models')
const { notifyAlertMin, notifyAlertMax } = require('../emails')
const { getCDP } = require('./cdps')

module.exports = {
  processAlerts
}

async function processAlerts () {
  console.log('Processing alerts')

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  const alerts = await Alert.find({
    disabled: false,
    lastNotifiedAt: {
      $lt: yesterday
    }
  })

  for (let i = 0; i < alerts.length; i++) {
    const alert = alerts[i]
    const cdps = await getCDPs(alerts[i].cdps)

    for (let j = 0; j < cdps.length; j++) {
      const cdp = cdps[j]

      if (shouldAlertMin(alert, cdp)) {
        await notifyAlertMin(alert, cdp)
        await updateAlertNotificationDate(alert, Date.now())
      }

      if (shouldAlertMax(alert, cdp)) {
        await notifyAlertMax(alert, cdp)
        await updateAlertNotificationDate(alert, Date.now())
      }
    }
  }

  console.log(`${alerts.length} alerts processed`)
}

async function getCDPs (ids) {
  return Promise.all(ids.map(getCDP))
}

function shouldAlertMin (alert, cdp) {
  return cdp.collateralizationRatio * 100 <= alert.min
}

function shouldAlertMax (alert, cdp) {
  return cdp.collateralizationRatio * 100 >= alert.max
}

async function updateAlertNotificationDate (alert, date) {
  alert.lastNotifiedAt = new Date(date)

  return alert.save()
}
