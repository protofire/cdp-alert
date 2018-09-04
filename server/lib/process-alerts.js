const { Alert } = require('../models')
const { notifyAlertMin, notifyAlertMax } = require('../emails')
const { getCDP } = require('./cdps')

module.exports = {
  processAlerts
}

async function processAlerts (days = 60) {
  console.log('Processing alerts')
  const alerts = await Alert.find({
    disabled: false
  })
  for (let i = 0; i < alerts.length; i++) {
    const alert = alerts[i]
    const cdps = await getCDPs(alerts[i].cdps)
    for (let j = 0; j < cdps.length; j++) {
      const cdp = cdps[j]
      if (shouldAlertMin(alert, cdp)) {
        await notifyAlertMin(alert, cdp)
      }
      if (shouldAlertMax(alert, cdp)) {
        await notifyAlertMax(alert, cdp)
      }
    }
  }
  console.log(alerts.length, 'alerts processed')
}

// @TODO: get real CDPs
async function getCDPs (ids) {
  return Promise.all(ids.map(getCDP))
}

// @TODO: check if collateralizationRatio is updated with ETH price
function shouldAlertMin (alert, cdp) {
  return cdp.collateralizationRatio * 100 <= alert.min
}

// @TODO: check if collateralizationRatio is updated with ETH price
function shouldAlertMax (alert, cdp) {
  return cdp.collateralizationRatio * 100 >= alert.max
}
