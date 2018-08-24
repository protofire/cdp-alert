require('dotenv').config()
const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const alerts = require('./alerts')
const PORT = process.env.PORT || 3000

const { disableOldAlerts } = require('./lib/disable-old-alerts')

setInterval(function () {
  disableOldAlerts(process.env.MAX_ALERT_AGE_DAYS)
}, 30 * 1000)

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
app.use(router.routes()).use(router.allowedMethods())

app.listen(PORT)
console.log('CDP Alert API listening on port', PORT)
