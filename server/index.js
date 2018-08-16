require('dotenv').config()
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const alerts = require('./alerts')
const PORT = process.env.PORT || 3000

const app = new Koa()
const router = new Router()

app.use(bodyParser())
router.use('/alerts', alerts.routes(), alerts.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())

app.listen(PORT)
console.log('CDP Alert API listening on port', PORT)
