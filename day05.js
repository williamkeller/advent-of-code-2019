const util = require('util')
const fs = require('fs')

export function interpreter(data, input_buffer) {
  let ip = 0
  let input_buffer_index = 0
  let running = true

  let panic_count = 0

  while(running) {
    panic_count += 1
    if(panic_count > 100)
      break

    let op = data[ip]

    let opcode
    let m1
    let m2
    let m3

    if(op === 99) {
      running = false
      break
    }

    if(op < 10 ) {
      opcode = op
      m1 = 0
      m2 = 0
      m3 = 0
    }
    else {
      let s = op.toString().split('').reverse()
      opcode = parseInt(s[0])
      m1 = parseInt(s[2])
      m2 = parseInt(s[3])
      m3 = parseInt(s[4])

    }

    // console.log(`opcode  ${opcode}  ${m1} ${m2} ${m3}`)


    // let addr1 = data[ip + 1]
    // let addr2 = data[ip + 2]
    // let addr3 = data[ip + 3]
    // let arg1, arg2, arg3

    let arg1 = data[ip + 1]
    let arg2 = data[ip + 2]
    let arg3 = data[ip + 3]


    // if(m1)
    //   arg1 = data[ip + 1]
    // else
    //   arg1 = addr1

    // if(m2)
    //   arg2 = data[ip + 2]
    // else
    //   arg2 = addr2

    // if(m3)
    //   arg3 = data[ip + 3]
    // else
    //   arg3 = addr3

    // console.log(`args  ${arg1} ${arg2} ${arg3}`)
    switch(opcode) {
      case 1:
        data[arg3] = (m1 ? arg1 : data[arg1] ) +
          (m2 ? arg2 : data[arg2])
        ip += 4
        break
      case 2:
        data[arg3] = (m1 ? arg1 : data[arg1]) *
          (m2 ? arg2 : data[arg2])
        ip += 4
        break
      case 3:
        data[arg1] = input_buffer[input_buffer_index]
        input_buffer_index += 1
        ip += 2
        break
      case 4:
        console.log(m1 ? arg1 : data[arg1])
        // console.log(`ip=${ip}`)
        // console.log(data.join(','))
        ip += 2
        break
    }

    // console.log(util.inspect(data.slice(0, 20)))
    if(running == false)
      break
  }
  return data[0]
}


if(process.argv[1] === __filename) {
  const data = fs.readFileSync('data/day05_input.txt', 'utf8').split(',').map(x => parseInt(x))

  interpreter(data, [1])
  // interpreter([3,0,4,0,99], [1])
  // let result = interpreter([...data], 12, 2)
  // console.log(result)

  // for(let i = 0; i < 100; i++) {
  //   for(let j = 0; j < 100; j++) {
  //     let result = interpreter([...data], i, j)
  //     if(result === 19690720) {
  //       console.log(`noun = ${i}, verb = ${j}`)
  //     }
  //   }
  // }
}





