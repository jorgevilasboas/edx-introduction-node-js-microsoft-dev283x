// imports 
const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')

let store = {}
store.accounts = []

let app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

//routes 

app.get('/accounts', (req, res) => {
    res.status(200).send(store.accounts)
})

app.post('/accounts', (req, res) => {
    let newAccount = req.body
    let id = store.accounts.length
    store.accounts.push(newAccount)
    res.status(201).send({
        id: id
    })
})

app.put('/accounts/:id', (req, res) => {
    store.accounts[req.params.id] = req.body
    res.status(200).send(store.accounts[req.params.id])
})

app.delete('/accounts/:id', (req, res) => {
    store.accounts.splice(req.params.id, 1)
    res.status(204).send()
})

app.listen(3000)


/*
curl commands for testing the API

//POST
curl -H "Content-Type: application/json" POST -d '{"balance": 100, "name":"checking"}'  "http://localhost:3000/accounts" -iv

//PUT
curl -H 'Content-Type: application/json' PUT -d '{"balance": 200, "name": "savings"}'  "http://localhost:3000/accounts/2" -iv

//GET
curl "http://localhost:3000/accounts" -iv

//DELETE 
curl DELETE "http://localhost:3000/accounts/0"
 */