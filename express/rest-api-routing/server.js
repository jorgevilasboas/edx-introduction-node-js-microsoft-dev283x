const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let profile = [{
    username: 'jorgevilasboas',
    email: 'jorge@email.com',
    url: 'https://jorgevilasboas.github.io/'
}]

app.get('/profile', (req, res) => {
    if (req.query.id) return res.send(profile[req.params.id])
    res.send(profile)
})

app.post('/profile', (req, res) => {
    if(!req.body.username || !req.body.email) return res.sendStatus(400)    
    let obj = {
        username: req.body.username,
        email: req.body.email,
        url: req.body.url
    }
    profile.push(obj)
    console.log('created', profile)
    res.sendStatus(201)
})

app.put('/profile/:id', (req, res) => {
    Object.assign(profile[req.params.id], req.body)    
    console.log('updated', profile[req.params.id])
    res.sendStatus(204)
})

app.delete('/profile/:id', (req, res) => {
    let deleted = profile.splice(req.params.id,1)
    console.log('deleted', deleted)
    res.sendStatus(204)
})

app.listen(3000)