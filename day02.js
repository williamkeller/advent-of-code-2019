const fs = require('fs')

module.exports = {

  interpreter: function(data, noun, verb) {
    let ip = 0
    let running = true

    data[1] = noun
    data[2] = verb

    while(running) {
      opcode = data[ip]

      if(opcode === 99) {
        running = false
        break;
      }

      let addr1 = data[ip + 1]
      let addr2 = data[ip + 2]
      let addr3 = data[ip + 3]
      let arg1 = data[addr1]
      let arg2 = data[addr2]

      switch(opcode) {
        case 1:
          data[addr3] = arg1 + arg2
          break
        case 2:
          data[addr3] = arg1 * arg2
          break
      }

      if(running == false)
        break

      ip += 4
    }
    return data[0]
  }
}

if(process.argv[1] === __filename) {
  const data = JSON.parse(fs.readFileSync('data/day02_input.json'))

  let result = module.exports.interpreter([...data], 12, 2)
  console.log(result)

  for(let i = 0; i < 100; i++) {
    for(let j = 0; j < 100; j++) {
      let result = module.exports.interpreter([...data], i, j)
      if(result === 19690720) {
        console.log(`noun = ${i}, verb = ${j}`)
      }
    }
  }
}
