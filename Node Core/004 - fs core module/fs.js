/*
Reading to and Writing from the File System in Node.js

Reading from files is done via the core fs module. There are two sets of reading methods: asynchronous (recommended) and synchronous. In most cases, developers should use async methods, such as fs.readFile because this methods won't block the event loop:

*/

const fs = require('fs');
const path = require('path');
fs.readFile(path.join(__dirname, '/data/customers.csv'), {encoding: 'utf-8'}, function (error, data) {
  if (error) return console.error(error)
  console.log(data);
})

//To write to the file, execute the following:

//const fs = require('fs');
fs.writeFile('message.txt', 'Hello World!', function (error) {
  if (error) return console.error(error)
  console.log('Writing is done.');
})


//Full documentation: http://nodejs.org/api/fs.html