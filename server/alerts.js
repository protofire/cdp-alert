var Router = require('koa-router')
const Joi = require('joi')
const validate = require('koa-joi-validate')

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

router.post('/', alertValidator, (ctx, next) => {
  ctx.body = ctx.request.body
})


module.exports = router
