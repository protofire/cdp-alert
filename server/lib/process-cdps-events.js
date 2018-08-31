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

async function processEventCdp (event, lastBlockFrom, failedCdps) {
  const cdpId = Number(event.returnValues.cup)

  if (event.blockNumber < lastBlockFrom && !failedCdps.includes(cdpId)) {
    return Promise.resolve()
  }

  try {
    await maker.getCdp(cdpId)
    await Cdp.updateOne(
      { cdpId },
      { ownerAddress: event.returnValues.lad },
      { upsert: true }
    )
  } catch (e) {
    if (e.message.includes("That CDP doesn't exist")) {
      await Cdp.deleteOne({ cdpId })
    } else {
      await Cdp.updateOne({ cdpId }, { ownerAddress: '' }, { upsert: true })
    }
  }
}

function processSaitubEvents ({ lastBlockFrom, failedCdps }) {
  saitubContract
    .getPastEvents(
      'LogNewCup',
      {
        fromBlock: failedCdps.length ? 0 : lastBlockFrom,
        toBlock: 'latest'
      },
      error =>
        error && console.log('saitubContract.getPastEvents error: ', error)
    )
    .then(async events => {
      if (!events.length && !failedCdps.length) {
        return console.log(`No events to process`)
      }

      console.log(`${events.length} new events for processing.`)
      console.log(`${failedCdps.length} old events for re-trying.`)

      await maker.authenticate()

      await Promise.all(
        events.map(event => processEventCdp(event, lastBlockFrom, failedCdps))
      )

      await Event.findOneAndUpdate(
        { lastBlockFrom: { $ne: -1 } },
        { lastBlockFrom: events[events.length - 1].blockNumber + 1 },
        { upsert: true }
      )

      console.log(`${events.length + failedCdps.length} CDPs events processed.`)
    })
    .catch(e => console.log(e))
}

function processCdpsEvents () {
  Promise.all([
    Event.findOne({ lastBlockFrom: { $exists: true, $ne: -1 } }).exec(),
    Cdp.find({ cdpId: { $ne: null }, ownerAddress: '' }, 'cdpId').exec()
  ])
    .then(res => ({
      lastBlockFrom: res[0] && res[0].lastBlockFrom ? res[0].lastBlockFrom : 0,
      failedCdps: res[1].map(cdp => cdp.cdpId)
    }))
    .then(res => processSaitubEvents(res))
    .catch(e => console.log('processCdpsEvents error: ', e))
}
