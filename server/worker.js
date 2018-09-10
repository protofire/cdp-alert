require('dotenv/config')

const { disableOldAlerts } = require('./lib/disable-old-alerts')
const { processAlerts } = require('./lib/process-alerts')
const { disableClosedCDPAlerts } = require('./lib/disable-closed-cdp-alerts')
const { processCdpsEvents } = require('./lib/process-cdps-events')

function start () {
  setInterval(function () {
    disableOldAlerts(process.env.MAX_ALERT_AGE_DAYS)
    disableClosedCDPAlerts()
  }, 1000 * process.env.ALERT_CLEANUP_INTERVAL_SECONDS)

  setInterval(function () {
    processAlerts()
  }, 1000 * process.env.ALERT_PROCESSING_INTERVAL_SECONDS)
  processAlerts()

  setInterval(function () {
    processCdpsEvents()
  }, 1000 * process.env.EVENTS_PROCESSING_INTERVAL_SECONDS)
  processCdpsEvents()
}

module.exports = { start }
