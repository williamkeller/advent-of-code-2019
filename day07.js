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

function permutator(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}

function wrap(data, input) {
  let output = []

  function callback(value) {
    output.push(value)
  }

  interpreter(data, input, callback)

  return output[0]
}

if(process.argv[1] === __filename) {
  const data = fs.readFileSync('data/day07_input.txt', 'utf8').split(',').map(x => parseInt(x))

  let options = [0, 1, 2, 3, 4]
  let indices = permutator(options)
  let largestValue = 0

  for(let seq of indices) {
    let r0 = wrap(data, [seq[0], 0])
    let r1 = wrap(data, [seq[1], r0])
    let r2 = wrap(data, [seq[2], r1])
    let r3 = wrap(data, [seq[3], r2])
    let r4 = wrap(data, [seq[4], r3])

    if(r4 > largestValue) {
      console.log(`${seq} == ${r4}`)
      largestValue = r4
    }
 }
}





