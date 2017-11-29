const express = require('express')
const app = express()

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

// Error handling
app.use((error, req, res, next) =>{
    console.log("Error thrown sucessfully!")
    res.status(500).send(error)
})
app.listen(3000)


/*
What is Middleware

The Middleware pattern is a series of processing units connected together, where the output of one unit is the input for the next one. In Node.js, this often means a series of functions in the form:

function(args, next) {
  // ... Run some code
  next(output) // Error or real output
}
The middleware pattern implements continuity. The request is coming from a client and a response is sent back to the client.

request->middleware1->middleware2->...middlewareN->route->response
Express has a middleware manager so developers only need to apply the middleware with app.use(). Take a look at this example:

var express = require('express')
var app = express()
//... Define middleware1-N
app.use(middleware1)
app.use(middleware2)
...
app.use(middlewareN)
...
Middleware Order

Middleware are executed in the order specified. In the following example, the logger('dev') middleware causes requests to be logged before the bodyParser.json() middleware causes payloads of requests to be parsed into request.body.

var logger = require('morgan')
var bodyParser = require('body-parser')
...
app.use(logger('dev'))
app.use(bodyParser.json())
Two Types of Express Middleware

There are two types of Express middleware:

npm modules, e.g., body-parser from npm used with app.use(bodyParser.json())
Custom middleware, e.g., app.use((req, res, next)=>{next()})
Developers can mix them. By utilizing middleware, developers can modularize their applications and reuse code.

Creating Middleware

Custom middleware is easy to create since it's just a function. Here's an example of creating a middleware and saving it as a variable which is used later to apply the middleware to the Express app:

const middleware = (request, response, next) => {
  // Modify request or response
  // Execute the callback when done
  next()
}
app.use(middleware)
Developers can also create middleware right in the app.use() call using an anonymous function definition:

app.use((request, response, next) => {
  // Modify request or response
  // Execute the callback when done
  next()
})
The first approach is better for modularizing because it's easier to move a named function or a function saved into a variable than an anonymous function.

Passing References

request is always the same object in the lifecycle of a single client request to the Express server. This allows us to implement a very useful pattern in which developers pass data from one middleware to another and to a request handler.

For example, developers can connect to a database in one middleware and make it available in all the subsequent middleware functions and request handlers (routes).

app.use(function (request, response, next) {  
  DatabaseClient.connect(URI, (err, db) => {
    // error handling
    request.database = db    
    next()
  })
})
In this middleware, database is available in the request object and we can run queries such as finding an application by the app ID:

app.use((req, res, next) => {
  req.database.collection('apps').findOne({appId: req.query.appId}, (err, app) => {
    // error handling
    req.app = app
    next()
  })
})
This makes moving routes and middleware to other files (modularization) straightforward, i.e., keeping code neat and organized.

*/