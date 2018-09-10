const assert = require('assert')

const {
  API_URL,
  MAILGUN_APIKEY,
  MAILGUN_DOMAIN = 'mg.cdpalert.org'
} = process.env

assert(process.env.API_URL, 'API_URL not configured. Add it to .env')
assert(
  process.env.MAILGUN_APIKEY,
  'MAILGUN_APIKEY not configured. Add it to .env'
)

const mailgun = require('mailgun-js')({
  apiKey: MAILGUN_APIKEY,
  domain: MAILGUN_DOMAIN
})

function sendAlertRegistrationEmail (options) {
  const { email, cdps, address, min, max } = options

  const text = `A new alert has been created with this email address (${email}).

    Details:
      CDPs: ${cdps.join(', ')}
      Wallet Address: ${address}
      Alert parameters:
         - Min: ${min}%
         - Max: ${max}%

    CDP Alert is an Open Source application. Made with ❤ by Protofire.io.
    `

  const data = {
    from: 'Protofire <leo@protofire.io>',
    to: email,
    subject: 'New CDP Alert created',
    text
  }

  return sendEmail(data)
}

async function notifyAlertMin (alert, cdp) {
  const deleteLink = createDeleteAlertLink(API_URL, alert)
  const ratio = Math.floor(cdp.collateralizationRatio * 10000) / 100

  const text = `A CDP Alert has been triggered for this email address (${
    alert.email
  }).

    CDP: ${cdp.id} is below the minimum alert threshold: ${ratio}% <= ${
  alert.min
}%.

    Details:
      CDP: ${cdp.id}
      Wallet Address: ${alert.address}
      Alert parameters:
         - Min: ${alert.min}%
         - Max: ${alert.max}%

    To delete this alert follow this link: ${deleteLink}

    CDP Alert is an Open Source application. Made with ❤ by Protofire.io.
    `

  const data = {
    from: 'Protofire <leo@protofire.io>',
    to: alert.email,
    subject: 'Minimum CDP Alert triggered for CDP ' + cdp.id,
    text
  }

  return sendEmail(data)
}

async function notifyAlertMax (alert, cdp) {
  const deleteLink = createDeleteAlertLink(API_URL, alert)
  const ratio = Math.floor(cdp.collateralizationRatio * 10000) / 100

  const text = `A CDP Alert has been triggered for this email address (${
    alert.email
  }).

    CDP: ${cdp.id} is above the maximum alert threshold: ${ratio}% >= ${
  alert.max
}%.

    Details:
      CDP: ${cdp.id}
      Wallet Address: ${alert.address}
      Alert parameters:
         - Min: ${alert.min}%
         - Max: ${alert.max}%

    To delete this alert follow this link: ${deleteLink}

    CDP Alert is an Open Source application. Made with ❤ by Protofire.io.
    `

  const data = {
    from: 'Protofire <leo@protofire.io>',
    to: alert.email,
    subject: 'Maximum CDP Alert triggered for CDP ' + cdp.id,
    text
  }

  return sendEmail(data)
}

async function sendEmail (data) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Email data', data)

    return Promise.resolve('OK but email not sent in dev mode.')
  }

  return new Promise(function (resolve, reject) {
    mailgun.messages().send(data, function (error, body) {
      if (error) {
        reject(error)
      } else {
        body.text = data.text
        resolve(body)
      }
    })
  })
}

function createDeleteAlertLink (apiURL, alert) {
  return `${apiURL}/alerts/${alert.id}/delete/${alert.secret}`
}

module.exports = {
  sendAlertRegistrationEmail,
  notifyAlertMin,
  notifyAlertMax
}
