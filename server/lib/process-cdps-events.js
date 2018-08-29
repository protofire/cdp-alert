require('dotenv').config()
const Web3 = require('web3')
const Maker = require('@makerdao/dai')

const { Cdp, Event } = require('../models/index')

module.exports = {
  processCdpsEvents
}

const httpWeb3 = new Web3(
  new Web3.providers.HttpProvider(process.env.INFURA_URL)
)
const contractAbi = require('../abi/saitub.json')
const saitubContract = new httpWeb3.eth.Contract(
  contractAbi,
  process.env.CONTRACT_ADDRESS
)

const maker = Maker.create(process.env.NETWORK, {
  privateKey: `0x${process.env.PRIVATE_KEY}`,
  log: false
})

async function processEventCdp (event) {
  try {
    const cdpId = Number(event.returnValues.cup)
    const ownerAddress = event.returnValues.lad

    await maker.getCdp(cdpId)

    await Cdp.create({ cdpId, ownerAddress })
  } catch (e) {
    // nothing to do
  }
}

function processSaitubEvents (lastBlockFrom) {
  saitubContract
    .getPastEvents(
      'LogNewCup',
      {
        fromBlock: lastBlockFrom,
        toBlock: 'latest'
      },
      error =>
        error &&
        console.log('saitubContract.getPastEvents error: ', error.message)
    )
    .then(async events => {
      if (!events.length) {
        return
      }

      console.log(`Read ${events.length} events`)

      await maker.authenticate()

      await Promise.all(events.map(event => processEventCdp(event)))

      await Event.findOneAndUpdate(
        { lastBlockFrom: { $ne: -1 } },
        { lastBlockFrom: events[events.length - 1].blockNumber + 1 },
        { upsert: true }
      )

      console.log('CDPs events processed successfully.')
    })
    .catch(e => console.log(e))
}

function processCdpsEvents () {
  Event.findOne({ lastBlockFrom: { $exists: true, $ne: -1 } }, (error, doc) =>
    processSaitubEvents(doc && doc.lastBlockFrom ? doc.lastBlockFrom : 0)
  )
}
