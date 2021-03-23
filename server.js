const express = require('express')
const session = require('express-session')
const app = express()
const {MongoClient} = require('mongodb')
const MongoStore = require('connect-mongo')
const bcrypt = require('bcrypt')
require('dotenv').config()

const {verifyCaptcha} = require('./verify-captcha')

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const client = new MongoClient(process.env.URI, { useUnifiedTopology: true })

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    client,
    dbName: 'reg_example'
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

client.connect()

app.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile(__dirname+'/public/personal.html')
  } else {
    res.sendFile(__dirname+'/public/auth.html')
  }
})

app.get('/get-users', async (_, res) => {
  try {
    const users = await client.db('reg_example').collection('users').find().toArray()
    res.send(users)
  } catch (e) {
    console.log("Error: " + e)
    res.status(500).send()
  }
})

app.post('/register', async (req, res) => {
  verifyCaptcha(req, res, async () => {
    const hashedPass = await bcrypt.hash(req.body.pass, 10)
    try {
      await client.db('reg_example').collection('users').insertOne({
        login: req.body.login,
        pass: hashedPass
      })
      req.session.loggedIn = true
      res.status(201).redirect('/')
    } catch (e) {
      console.log("Error: " + e)
      res.status(500).send()
    }
  })
})

app.post('/login', async (req, res) => {
  verifyCaptcha(req, res, async () => {
    try {
      const user = await client.db('reg_example').collection('users').findOne({
        login: req.body.login
      })
      if (user && bcrypt.compareSync(req.body.pass, user.pass)) {
        req.session.loggedIn = true
        res.status(200).redirect('/')
      } else {
        res.status(401).send("Invalid login credentials")
      }
    } catch (e) {
      console.log("Error: " + e)
      res.status(500).send()
    }
  })
})

app.get('/logout', (req, res) => {
  if (req.session) {
    req.session.loggedIn = false
  }
  res.redirect('/')
})

app.listen(process.env.PORT)
