const util = require('util')
const fs = require('fs')

export function interpreter(data, input_buffer, callback) {
  let ip = 0
  let input_buffer_index = 0
  let running = true

  while(running) {
    let opcode = data[ip]

    switch(opcode) {
      case 99:
        running = false
        break

      case 1:  // ADD ind ind ind
        data[data[ip + 3]] = data[data[ip + 1]] + data[data[ip + 2]]
        ip += 4
        break
      case 101: // ADD dir ind ind
        data[data[ip + 3]] = data[ip + 1] + data[data[ip + 2]]
        ip += 4
        break
      case 1001: // ADD ind dir ind
        data[data[ip + 3]] = data[data[ip + 1]] + data[ip + 2]
        ip += 4
        break
      case 1101: // ADD dir dir ind
        data[data[ip + 3]] = data[ip + 1] + data[ip + 2]
        ip += 4
        break

      case 2:  // MULT ind ind ind
        data[data[ip + 3]] = data[data[ip + 1]] * data[data[ip + 2]]
        ip += 4
        break
      case 102: // MULT dir ind ind
        data[data[ip + 3]] =  data[ip + 1] * data[data[ip + 2]]
        ip += 4
        break
      case 1002: // MULT ind dir ind
        data[data[ip + 3]] = data[data[ip + 1]] * data[ip + 2]
        ip += 4
        break
      case 1102: // MULT dir dir ind
        data[data[ip + 3]] = data[ip + 1] * data[ip + 2]
        ip += 4
        break

      case 3:  // IN ind
        data[data[ip + 1]] = input_buffer[input_buffer_index]
        input_buffer_index += 1
        ip += 2
        break

      case 4:  // OUT ind
        callback(data[data[ip + 1]])
        ip += 2
        break
      case 104:  // OUT dir
        callback(data[ip + 1])
        ip += 2
        break

      case 5:  // JT pos pos
        if(data[data[ip + 1]] != 0)
          ip = data[data[ip + 2]]
        else
          ip += 3
        break
      case 105:  // JT imm pos
        if(data[ip + 1] != 0)
          ip = data[data[ip + 2]]
        else
          ip += 3
        break
      case 1005:  // JT pos imm
        if(data[data[ip + 1]] != 0)
          ip = data[ip + 2]
        else
          ip += 3
        break
      case 1105:  // JT imm imm
        if(data[ip + 1] != 0)
          ip = data[ip + 2]
        else
          ip += 3
        break

      case 6:  // JF pos pos
        if(data[data[ip + 1]] == 0)
          ip = data[data[ip + 2]]
        else
          ip += 3
        break
      case 106:  // JF imm pos
        if(data[ip + 1] == 0)
          ip = data[data[ip + 2]]
        else
          ip += 3
        break
      case 1006:  // JF pos imm
        if(data[data[ip + 1]] == 0)
          ip = data[ip + 2]
        else
          ip += 3
        break
      case 1106:  // JF imm imm
        if(data[ip + 1] == 0)
          ip = data[ip + 2]
        else
          ip += 3
        break

      case 7:  // LT pos pos
        if(data[data[ip + 1]] < data[data[ip + 2]])
          data[data[ip + 3]] = 1
        else
          data[data[ip + 3]] = 0
        ip += 4
        break
      case 107:  // LT imm pos
        if(data[ip + 1] < data[data[ip + 2]])
          data[data[ip + 3]] = 1
        else
          data[data[ip + 3]] = 0
        ip += 4
        break
      case 1007:  // LT pos imm
        if(data[data[ip + 1]] < data[ip + 2])
          data[data[ip + 3]] = 1
        else 
          data[data[ip + 3]] = 0
        ip += 4
        break
      case 1107:  // LT imm imm
        if(data[ip + 1] < data[ip + 2])
          data[data[ip + 3]] = 1
        else 
          data[data[ip + 3]] = 0
        ip += 4
        break

      case 8:  // EQ pos pos pos
        if(data[data[ip + 1]] == data[data[ip + 2]])
          data[data[ip + 3]] = 1
        else 
          data[data[ip + 3]] = 0
        ip += 4
        break
      case 108:  // EQ imm pos pos
        if(data[ip + 1] == data[data[ip + 2]])
          data[data[ip + 3]] = 1
        else 
          data[data[ip + 3]] = 0
        ip += 4
        break
      case 1008:  // EQ pos imm pos
        if(data[data[ip + 1]] == data[ip + 2])
          data[data[ip + 3]] = 1
        else
          data[data[ip + 3]] = 0
        ip += 4
        break
      case 1108:  // EQ imm imm pos
        if(data[ip + 1] == data[ip + 2])
          data[data[ip + 3]] = 1
        else
          data[data[ip + 3]] = 0
        ip += 4
        break

      default:
        console.log(`Unrecognized opcode ${opcode}!`)
    }

    if(running == false)
      break
  }
}


if(process.argv[1] === __filename) {
  const data = fs.readFileSync('data/day05_input.txt', 'utf8').split(',').map(x => parseInt(x))

  interpreter(data, [5], out => console.log(out))
}





