const request = require('request')

module.exports = {
  verifyCaptcha: function (req, res, cb) {
    if (!req.body['g-recaptcha-response']) {
      return res.status(401).send("Invalid captcha")
    }

    const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + process.env.SECRET_KEY + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.socket.remoteAddress

    request(verificationURL, async function(_, _, body) {
      body = JSON.parse(body)

      if (body.success !== undefined && !body.success) {
        return res.status(401).send("Invalid captcha")
      }

      cb()
    })
  }
}