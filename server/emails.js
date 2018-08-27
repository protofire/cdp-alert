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
  const deleteLink = `${apiURL}/alerts/${id}/delete/${secret}`
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
  if (process.env.NODE_ENV !== 'production') {
    console.log('Email data', data)
    return Promise.resolve('OK but email not sent in dev mode.')
  }
  return new Promise(function (resolve, reject) {
    mailgun.messages().send(data, function (error, body) {
      if (error) {
        reject(error)
      } else {
        body.text = text
        resolve(body)
      }
    })
  })
}

module.exports = {
  sendAlertRegistrationEmail
}
