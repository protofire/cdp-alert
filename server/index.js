require('dotenv').config()
const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const alerts = require('./alerts')
const cdps = require('./cdps')
const PORT = process.env.PORT || 3000

const { disableOldAlerts } = require('./lib/disable-old-alerts')
const { processAlerts } = require('./lib/process-alerts')
const { disableClosedCDPAlerts } = require('./lib/disable-closed-cdp-alerts')

setInterval(function () {
  disableOldAlerts(process.env.MAX_ALERT_AGE_DAYS)
  disableClosedCDPAlerts()
}, 1000 * process.env.ALERT_CLEANUP_INTERVAL_SECONDS)

setInterval(function () {
  processAlerts()
}, 1000 * process.env.ALERT_PROCESSING_INTERVAL_SECONDS)

const app = new Koa()
const router = new Router()

app.use(
  cors({
    origin: '*'
  })
)
app.use(bodyParser())
router.get('/', ctx => {
  ctx.body = 'CDPAlert API'
})
router.use('/alerts', alerts.routes(), alerts.allowedMethods())
router.use('/cdps', cdps.routes(), cdps.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())

app.listen(PORT)
console.log('CDP Alert API listening on port', PORT)
