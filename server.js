const express = require('express')
const cookieSession = require('cookie-session')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cookieSession({
  name: 'session',
  secret: process.env.SECRET,
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  secure: false,
  sameSite: 'none'
}))

app.set('trust proxy', 2)

app.use(
  express.urlencoded({ extended: true }),
  express.json(),
  cors({credentials: true, origin: 'http://localhost:8080'})
)

app.post('/api/login', (req, res) => {
  req.session.loggedIn = req.session.loggedIn ?? false
  if (req.session.loggedIn) {
    res.status(200).sendFile(__dirname+'/public/pic.jpg');
  } else {
    if ((req.body.login === 'gora@studio.ru' || req.body.login === "+79211231313") && req.body.pass === "2021") {
      req.session.loggedIn = true
      res.status(200).sendFile(__dirname+'/public/pic.jpg')
    } else {
      res.status(401).send()
    }
  }
})

app.post('/api/logout', (req, res) => {
  if (req.session) {
    req.session.loggedIn = false
    res.status(200).send()
  }
})

app.listen(process.env.PORT)
