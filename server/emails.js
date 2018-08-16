var apiKey = process.env.MAILGUN_APIKEY
if (!apiKey) {
  throw new Error('MAILGUN_APIKEY not configured. Add it to .env')
}
var domain = 'mg.cdpalert.org'
var mailgun = require('mailgun-js')({
  apiKey,
  domain
})

function sendAlertRegistrationEmail ({ email, cdpId, address, min, max }) {
  const text = `A new alert has been created with this email address (${email}).

    Details:
      CDP: ${cdpId}
      Wallet Address: ${address}
      Alert parameters:
         - Min: ${min}%
         - Max: ${max}%

    To delete this alert follow this link: TBD

    CDP Alert is an Open Source application. Made with ❤ by Protofire.io.
    `
  var data = {
    from: 'Protofire <leo@protofire.io>',
    to: email,
    subject: 'New CDP Alert created',
    text
  }
  return new Promise(function (resolve, reject) {
    mailgun.messages().send(data, function (error, body) {
      if (error) {
        reject(error)
      } else {
        resolve(body)
      }
    })
  })
}

module.exports = {
  sendAlertRegistrationEmail
}
