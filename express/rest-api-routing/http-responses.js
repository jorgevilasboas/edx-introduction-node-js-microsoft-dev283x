//The response object is also accessible via routing handlers in Express because it is the second argument in the handler's callback:

app.get('/users/:id', function (request, response) {
  // 'response' is the enhanced response from http
})

//The response object is used to send the response and to modify an HTTP response before sending it out.

//Express Response Method

//The Express response object has additional methods to the core http's statusCode(), writeHead(), end() and write().

response.redirect(url) // redirect request
response.send(data) // send response
response.json(data) // send JSON and force proper headers
response.sendfile(path, options, callback) // send a file
response.render(templateName, locals, callback) // render a template
response.locals // pass data to template

//HTTP Status Codes

//To specify a status code, use the response object's status function:

app.get('/user/:id', function (request, response) {
  // Logic to check for user
  if (!exists) {
    response.status(404)
  } else if (authorized) {
    response.status(200)
  } else {
    response.status(401)
  }
  // ...
})

/*
HTTP Status Codes

2XX: for successfully processed requests
3XX: for redirections or cache information
4XX: for client-side errors
5XX: for server-side errors
Note: for 3xx status codes, the client must take additional action following the completion of the current request
*/

//Sending a Response

//Use the response object's send function to send the client a response:

app.get('...', function (request, response) {
  response.send('Hello World!')
})

//Sending a Response

//The content-type is determined given the type of argument passed:

response.send('Hello World!')       // Content-type: text/plain
response.send([ 5, 7, 9 ])          // Content-type: application/json
response.send({ name: 'John Doe' }) // Content-type: application/json

//Sending a Response

//The content-type can also be hardcoded:

response.set('Content-Type', 'text/plain')
response.send('Just regular text, no html expected!')
//Sending an Empty Response

//Some status codes like 204 do not support (according to the W3C specs) a body. Express allows you to send an empty body:

response.status(204).end()
//Other status codes can be also used with an empty body:

response.status(404).end()