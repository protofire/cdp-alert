const Router = require('koa-router')
const Joi = require('joi')
const validate = require('koa-joi-validate')

const { sendAlertRegistrationEmail } = require('../emails')
const { Alert } = require('../models')

const alertRouter = new Router()

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

const deleteAlertValidator = validate({
  params: {
    id: Joi.string().required(),
    secret: Joi.string().required()
  }
})

alertRouter.get(
  '/:id/delete/:secret',
  deleteAlertValidator,
  async (ctx, next) => {
    try {
      const alert = await Alert.findOne({
        _id: ctx.params.id,
        secret: ctx.params.secret,
        disabled: false
      })

      if (!alert) {
        ctx.throw(404, 'Alert not found')
      }

      alert.disabled = true
      await alert.save()

      ctx.body = 'Alert deleted. You can close this page.'
    } catch (error) {
      ctx.throw(404, 'Alert not found')
    }
  }
)

alertRouter.post('/', alertValidator, async (ctx, next) => {
  try {
    await sendAlertRegistrationEmail(ctx.request.body)

    await Promise.all(
      ctx.request.body.cdps.map(cdpId => {
        const alert = new Alert(ctx.request.body)
        alert.cdps = [cdpId]
        return alert.save()
      })
    )

    ctx.body = ctx.request.body
  } catch (error) {
    ctx.throw(400, error.message || 'Bad request')
  }
})

module.exports = alertRouter
