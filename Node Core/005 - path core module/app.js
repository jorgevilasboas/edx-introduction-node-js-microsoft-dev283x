const path = require('path')
const server = require(path.join(__dirname, 'app', 'server.js')) ;
const absolutePath = path.join(__dirname, 'app', 'server.js') ;
const relativePath = path.join('app', 'server.js') ;


console.log(server());


console.log("absolutePath: " + absolutePath);
console.log("relativePath: " + relativePath);