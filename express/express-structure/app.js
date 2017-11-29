 //-------APP SECTIONS-------\\

/*
1. Imports
2. Instantiations
3. Configurations
4. Middleware
5. Routes
6. Error handlers
7. Server bootup or server export
*/

//1. Imports
const express = require('express') 
//2. Instantiations
const app = express()
//3. Configurations
app.set('port', process.env.PORT || 3000)
app.set('views', 'templates') // The directory the templates are stored in
app.set('view engine', 'jade')
// Routes
app.get('/', (req, res)=>{
  res.send('hello world')
})
// Bootup
app.listen(3000)