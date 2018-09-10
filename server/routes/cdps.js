const Router = require('koa-router')
const Joi = require('joi')
const validate = require('koa-joi-validate')
const Maker = require('@makerdao/dai')

const { Cdp } = require('../models')

const cdpRouter = new Router()

const getCdpsValidator = validate({
  params: {
    address: Joi.string().required()
  }
})

cdpRouter.get('/:address', getCdpsValidator, async (ctx, next) => {
  try {
    const ownerAddress = ctx.params.address.toLowerCase()
    const cdpsIds = await Cdp.find({ ownerAddress }, 'cdpId')

    if (!cdpsIds) {
      ctx.throw(404, 'No CDPs found')
    }

    const maker = Maker.create(process.env.NETWORK, {
      privateKey: `0x${process.env.PRIVATE_KEY}`,
      log: false
    })

    await maker.authenticate()

    const cdps = []

    await Promise.all(
      cdpsIds.map(async doc => {
        const cdpId = doc.cdpId

        try {
          const cdpApi = await maker.getCdp(cdpId)

          const [
            borrowedDai,
            lockedEth,
            liquidationPrice,
            collateralizationRatio
          ] = await Promise.all([
            cdpApi
              .getDebtValue()
              .then(res => (res ? res.toNumber() : -1))
              .catch(() => -1),

            cdpApi
              .getCollateralValue()
              .then(res => (res ? res.toNumber() : -1))
              .catch(() => -1),

            cdpApi
              .getLiquidationPrice()
              .then(res => (res ? res.toNumber() : -1))
              .catch(() => -1),

            cdpApi
              .getCollateralizationRatio()
              .then(res => (Number.isFinite(Number(res)) ? res : -1))
              .catch(() => -1)
          ])

          const cdpData = {
            cdpId,
            ownerAddress,
            borrowedDai,
            lockedEth,
            liquidationPrice,
            collateralizationRatio
          }

          cdps.push(cdpData)
        } catch (e) {
          console.log('Cdp id', cdpId, e.message)

          if (e.message.includes("That CDP doesn't exist")) {
            Cdp.deleteOne({ cdpId })
          }
        }
      })
    )

    ctx.body = cdps
  } catch (error) {
    ctx.throw(error)
  }
})

module.exports = cdpRouter
