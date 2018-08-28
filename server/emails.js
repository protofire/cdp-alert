var apiKey = process.env.MAILGUN_APIKEY
var apiURL = process.env.API_URL
if (!apiKey) {
  throw new Error('MAILGUN_APIKEY not configured. Add it to .env')
}
if (!apiURL) {
  throw new Error('API_URL not configured. Add it to .env')
}
var domain = 'mg.cdpalert.org'
var mailgun = require('mailgun-js')({
  apiKey,
  domain
})

function sendAlertRegistrationEmail ({
  email,
  cdps,
  address,
  min,
  max,
  id,
  secret
}) {
  const deleteLink = createDeleteAlertLink(apiURL, { id, secret })
  const text = `A new alert has been created with this email address (${email}).

    Details:
      CDPs: ${cdps.join(', ')}
      Wallet Address: ${address}
      Alert parameters:
         - Min: ${min}%
         - Max: ${max}%

    To delete this alert follow this link: ${deleteLink}

    CDP Alert is an Open Source application. Made with ❤ by Protofire.io.
    `
  var data = {
    from: 'Protofire <leo@protofire.io>',
    to: email,
    subject: 'New CDP Alert created',
    text
  }
  return sendEmail(data)
}

async function notifyAlertMin (alert, cdp) {
  const deleteLink = createDeleteAlertLink(apiURL, alert)
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
  var data = {
    from: 'Protofire <leo@protofire.io>',
    to: alert.email,
    subject: 'Minimum CDP Alert triggered for CDP ' + cdp.id,
    text
  }
  return sendEmail(data)
}

async function notifyAlertMax (alert, cdp) {
  const deleteLink = createDeleteAlertLink(apiURL, alert)
  const ratio = Math.floor(cdp.collateralizationRatio * 10000) / 100
  const text = `A CDP Alert has been triggered for this email address (${
    alert.email
  }).

    CDP: ${cdp.id} is above the maximum alert threshold: ${ratio}% >= ${
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
  var data = {
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
