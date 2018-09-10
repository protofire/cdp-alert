const Maker = require('@makerdao/dai')

const maker = Maker.create(process.env.NETWORK, {
  privateKey: `0x${process.env.PRIVATE_KEY}`,
  log: false
})

const auth = maker.authenticate()

async function getCDP (id) {
  await auth
  try {
    const cdpApi = await maker.getCdp(Number(id))
    const collateralizationRatio = Number(
      await cdpApi.getCollateralizationRatio()
    )

    return { id, collateralizationRatio }
  } catch (e) {
    console.error(e)
    return null
  }
}

module.exports = {
  getCDP
}
