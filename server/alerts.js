var Router = require('koa-router')
const Joi = require('joi')
const validate = require('koa-joi-validate')
const { sendAlertRegistrationEmail } = require('./emails')
const { Alert } = require('./models')

var router = new Router()

const alertValidator = validate({
  body: {
    email: Joi.string().required(),
    cdps: Joi.array()
      .items(Joi.string().required())
      .required(),
    address: Joi.string().required(),
    min: Joi.number().required(),
    max: Joi.number().required()
  }
})

router.post('/', alertValidator, async (ctx, next) => {
  console.log('Valid parameters')
  try {
    const alert = new Alert(ctx.request.body)
    await sendAlertRegistrationEmail(await alert.save())
    ctx.body = alert
  } catch (error) {
    ctx.throw(400, error.message || 'Bad request')
  }
})

module.exports = router
