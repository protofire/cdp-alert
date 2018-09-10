require('dotenv/config')

const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')

const router = require('./routes')
const worker = require('./worker')

// Start background process
worker.start()

// Start web app
const app = new Koa()
const port = process.env.PORT || 3000

app.use(cors({ origin: '*' }))
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

app.listen(port, () => {
  console.log('CDP Alert API listening on port', port)
})
