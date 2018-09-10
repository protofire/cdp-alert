const Router = require('koa-router')

const alerts = require('./alerts')
const cdps = require('./cdps')

const router = new Router()

router.get('/status', ctx => (ctx.body = { status: 'OK' }))
router.use('/alerts', alerts.routes(), alerts.allowedMethods())
router.use('/cdps', cdps.routes(), cdps.allowedMethods())

module.exports = router
