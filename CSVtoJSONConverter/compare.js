const path = require('path')
const fs = require('fs')
const _ = require('lodash')

file1 = process.argv[2]
file2 = process.argv[3]

if (!file1 || !file2) {
  console.log('Specify two files to compare')
  process.exit(1)
}

try {
    const contentFile1 = JSON.parse(fs.readFileSync(path.join(__dirname, file1)))
    const contentFile2 = JSON.parse(fs.readFileSync(path.join(__dirname, file2)))

    if (_.isEqual(contentFile1, contentFile2)) {
      console.log('The objects are equal')
    } else {
      console.log('The objects are not equal')
    }
} catch(error) {
    console.error(error.message)
}