const path = require('path')
const fs = require('fs')
const csv = require('csvtojson')
const csvFilePath = path.join(__dirname, 'customer-data.csv');
let arr = []

csv()
.fromFile(csvFilePath)
.on('json',(jsonObj)=>{
    arr.push(jsonObj)
})
.on('done',(error)=>{
  fs.writeFile('customer-data.json', JSON.stringify(arr, null, 2), (error)=>{
    if (error) return process.exit(1)
    console.log('done')
    process.exit(0)
  })
})