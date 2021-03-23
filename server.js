const express = require('express')
const session = require('express-session')
const app = express()
const {MongoClient} = require('mongodb')
const bcrypt = require('bcrypt')
//const uuid4 = require('uuid4')
require('dotenv').config()

app.use(express.static("public"));
app.use(express.json())
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

const client = new MongoClient(process.env.URI, { useUnifiedTopology: true })
client.connect()

app.get('/', (_, res) => {
  res.sendFile('index.html')
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

app.get('/register', async (req, res) => {
  const hashedPass = await bcrypt.hash(req.query.pass, 10)
  try {
    await client.db('reg_example').collection('users').insertOne({
      login: req.query.login,
      pass: hashedPass
    })
    res.status(201).send("Welcome aboard!")
  } catch (e) {
    console.log("Error: " + e)
    res.status(500).send()
  }
})

app.get('/login', async (req, res) => {
  try {
    const user = await client.db('reg_example').collection('users').findOne({
      login: req.query.login
    })
    if (user && bcrypt.compareSync(req.query.pass, user.pass)) {
      res.status(200).send("Logged in!")
    } else {
      res.status(401).send("Invalid login credentials")
    }
  } catch (e) {
    console.log("Error: " + e)
    res.status(500).send()
  }
})

app.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(function() {})
  }
  res.send()
})

app.listen(3000)
