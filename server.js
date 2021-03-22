const express = require('express')
const app = express()
const {MongoClient} = require('mongodb')
const bcrypt = require('bcrypt')

app.use(express.json())
const uri = "mongodb://localhost?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useUnifiedTopology: true })

app.get('/get-users', async (_, res) => {
  try {
    await client.connect()
    const users = await client.db('reg_example').collection('users').find().toArray()
    res.send(users)
  } catch (e) {
    console.log("Database error: " + e)
    res.status(500)
  } finally {
    client.close()
  }
})

app.get('/register', async (req, res) => {
  const hashedPass = await bcrypt.hash(req.query.pass, 10)
  try {
    await client.connect()
    await client.db('reg_example').collection('users').insertOne({
      login: req.query.login,
      pass: hashedPass
    })
    res.status(201).send();
  } catch (e) {
    console.log("Database error: " + e)
    res.status(500)
  } finally {
    client.close()
  }
})

app.listen(3000)
