const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
app.use(morgan('dev'))

app.use((req, res, next) => {
    console.log(`method: ${req.method} url: ${req.url}`)
    next()
})

app.use((req, res, next) => {
    if (req.query.api_key){
        next()
    } else {
        res.status(401).send({msg:"not authorized"})
    }
})

app.get('/', (req, res) => {
    res.send({msg:'Hello World!'})
})

app.get('/accounts', (req, res, next) => {
    console.log('accounts inline middleware')
    next(new Error('oooops'))
    //next()
}
,(req, res) => {
    res.send({msg:'Accounts'})
})

app.get('/transactions', (req, res) => {
    console.log(req.body)
    res.send({msg:'transactions'})
})


// Error handling
app.use((error, req, res, next) =>{
    console.log("Error thrown sucessfully!")
    res.status(500).send(error)
})
app.listen(3000)


/*
Request Body

Typically an HTTP request body, a.k.a. payload, has information from a POST request when a client wants to create a new entity/record or update an existing one with PUT. Developers who implement servers, often need to access the request body information.

There's body-parser npm module which does just that. No need to code anything. Just install body-parser and enable the json() and urlencoded() middleware to convert raw form data into JSON.

So first, install body-parser with npm:

npm install body-parser
Then import middleware:

const bodyParser = require('body-parser')
And apply json to parse application/json type (that's what single-page applications and other JSON REST clients use):

app.use(bodyParser.json())
Usage: AJAX/XHR from single-page applications and other JSON REST clients.

Sometimes, the type could be different from application/json. For example, HTML web forms <form> with action attribute use application/x-www-form-urlencoded. And there's just such a middleware for parsing this type too:

app.use(bodyParser.urlencoded({extended: false}))
Usage: HTML web forms with action attribute.

Extended: false uses the querystring library while extended: true uses the qs library. The “extended:true” syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.

*/