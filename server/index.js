require('dotenv').config()
const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const alerts = require('./alerts')
const cdps = require('./cdps')

const worker = require('./worker')

const PORT = process.env.PORT || 3000

// Start background process
worker.start()

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
