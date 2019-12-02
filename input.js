const fs = require('fs')
const readline = require('readline')

module.exports = {

  readByLineAsync: function(filename, callback) {
    let rl = readline.createInterface({
      input: fs.createReadStream(filename)
    })

    rl.on('line', (line) => { callback(line) })
    rl.on('close', () => { callback(null) })
  }
}
