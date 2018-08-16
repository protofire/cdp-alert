var Router = require('koa-router')
const Joi = require('joi')
const validate = require('koa-joi-validate')
const { sendAlertRegistrationEmail } = require('./emails')

var router = new Router()

const alertValidator = validate({
  body: {
    email: Joi.string().required(),
    cdpId: Joi.string().required(),
    address: Joi.string().required(),
    min: Joi.number().required(),
    max: Joi.number().required()
  }
})

router.post('/', alertValidator, async (ctx, next) => {
  console.log('Valid parameters')
  try {
    await sendAlertRegistrationEmail(ctx.request.body)
  } catch (error) {
    ctx.throw(400, error.message || 'Bad request')
  }
  console.log('Email sent')
  ctx.body = ctx.request.body
})

module.exports = router
