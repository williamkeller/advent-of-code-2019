const util = require('util')
const fs = require('fs')

export class VM {
  
  constructor(data, input_callback, output_callback) {
    this._data = data
    this._input_callback = input_callback
    this._output_callback = output_callback
    this._running = false
    this._ip = 0
  }

  get data() {
    return this._data
  }

  get ip() {
    return this._ip
  }

  set ip(value) {
    this._ip = value
  }

  setIp(value) {
    this._ip = value
  }

  incIp(value) {
    this._ip += value
  }

  pos(offset) {
    return this.data[this.data[this.ip + offset]]
  }

  imm(offset) {
    return this.data[this.ip + offset]
  }

  setDataPos(loc, value) {
    this._data[this._data[this.ip + loc]] = value
  }

  setDataImm(loc, value) {
    this._data[loc] = value
  }


  run() {
    this._running = true
    while(this._running == true) {
      this.step()
    }
  }

  stepUntilOutput() {
    let opcode
    while(true) {
      opcode = this.step()

      if(opcode == 99 || opcode == 4 || opcode == 104)
        break
    }
    return opcode
  }

  step() {
    let opcode = this._data[this._ip]

    switch(opcode) {
      case 99:
        this._running = false
        break

      case 1:  // ADD pos pos pos
        this.setDataPos(3, this.pos(1) + this.pos(2))
        this.incIp(4)
        break
      case 101: // ADD imm pos pos
        this.setDataPos(3, this.imm(1) + this.pos(2))
        this.incIp(4)
        break
      case 1001: // ADD pos imm pos
        this.setDataPos(3, this.pos(1) + this.imm(2))
        this.incIp(4)
        break
      case 1101: // ADD imm imm pos
        this.setDataPos(3, this.imm(1) + this.imm(2))
        this.incIp(4)
        break

      case 2:  // MULT pos pos pos
        this.setDataPos(3, this.pos(1) * this.pos(2))
        this.incIp(4)
        break
      case 102: // MULT imm pos pos
        this.setDataPos(3, this.imm(1) * this.pos(2))
        this.incIp(4)
        break
      case 1002: // MULT pos imm pos
        this.setDataPos(3, this.pos(1) * this.imm(2))
        this.incIp(4)
        break
      case 1102: // MULT imm imm pos
        this.setDataPos(3, this.imm(1) * this.imm(2))
        this.incIp(4)
        break

      case 3:  // IN pos
        this.setDataPos(1, this._input_callback())
        this.incIp(2)
        break

      case 4:  // OUT pos
        this._output_callback(this.pos(1))
        this.incIp(2)
        break
      case 104:  // OUT imm
        this._output_callback(this.imm(1))
        this.incIp(2)
        break

      case 5:  // JT pos pos
        if(this._data[this._data[this._ip + 1]] != 0)
          this.setIp(this._data[this._data[this._ip + 2]])
        else
          this.incIp(3)
        break
      case 105:  // JT imm pos
         if(this.imm(1) != 0)
           this.setIp(this.pos(2))
        else
          this.incIp(3)
        break
      case 1005:  // JT pos imm
        if(this.pos(1) != 0)
          this.setIp(this.imm(2))
        else
          this.incIp(3)
        break
      case 1105:  // JT imm imm
        if(this.imm(1) != 0)
          this.setIp(this.imm(2))
        else
          this.incIp(3)
        break

      case 6:  // JF pos pos
        if(this.pos(1) == 0)
          this.setIp(this.pos(2))
        else
          this.incIp(3)
        break
      case 106:  // JF imm pos
        if(this._data[this._ip + 1] == 0)
          this._ip = this._data[this._data[this._ip + 2]]
        else
          this.incIp(3)
        break
      case 1006:  // JF pos imm
        if(this._data[this._data[this._ip + 1]] == 0)
          this._ip = this._data[this._ip + 2]
        else
          this.incIp(3)
        break
      case 1106:  // JF imm imm
        if(this._data[this._ip + 1] == 0)
          this._ip = this._data[this._ip + 2]
        else
          this.incIp(3)
        break

      case 7:  // LT pos pos
        if(this._data[this._data[this._ip + 1]] < this._data[this._data[this._ip + 2]])
          this._data[this._data[this._ip + 3]] = 1
        else
          this._data[this._data[this._ip + 3]] = 0
        this._ip += 4
        break
      case 107:  // LT imm pos
        if(this._data[this._ip + 1] < this._data[this._data[this._ip + 2]])
          this._data[this._data[this._ip + 3]] = 1
        else
          this._data[this._data[this._ip + 3]] = 0
        this._ip += 4
        break
      case 1007:  // LT pos imm
        if(this._data[this._data[this._ip + 1]] < this._data[this._ip + 2])
          this._data[this._data[this._ip + 3]] = 1
        else 
          this._data[this._data[this._ip + 3]] = 0
        this._ip += 4
        break
      case 1107:  // LT imm imm
        if(this._data[this._ip + 1] < this._data[this._ip + 2])
          this._data[this._data[this._ip + 3]] = 1
        else 
          this._data[this._data[this._ip + 3]] = 0
        this._ip += 4
        break

      case 8:  // EQ pos pos pos
        if(this._data[this._data[this._ip + 1]] == this._data[this._data[this._ip + 2]])
          this._data[this._data[this._ip + 3]] = 1
        else 
          this._data[this._data[this._ip + 3]] = 0
        this._ip += 4
        break
      case 108:  // EQ imm pos pos
        if(this._data[this._ip + 1] == this._data[this._data[this._ip + 2]])
          this._data[this._data[this._ip + 3]] = 1
        else 
          this._data[this._data[this._ip + 3]] = 0
        this._ip += 4
        break
      case 1008:  // EQ pos imm pos
        if(this._data[this._data[this._ip + 1]] == this._data[this._ip + 2])
          this._data[this._data[this._ip + 3]] = 1
        else
          this._data[this._data[this._ip + 3]] = 0
        this._ip += 4
        break
      case 1108:  // EQ imm imm pos
        if(this._data[this._ip + 1] == this._data[this._ip + 2])
          this._data[this._data[this._ip + 3]] = 1
        else
          this._data[this._data[this._ip + 3]] = 0
        this._ip += 4
        break

      default:
        console.log(`Unrecognized opcode ${opcode}!`)
    }

    return opcode
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
  let input_index = 0

  function input_callback() {
    let i = input[input_index]
    input_index += 1
    return i
  }

  function output_callback(value) {
    output.push(value)
  }

  let vm = new VM(data, input_callback, output_callback)
  vm.run()

  return output[0]
}

export function feedbackMode(data, phases) {
  let input0 = [phases[0], 0]
  let input1 = [phases[1]]
  let input2 = [phases[2]]
  let input3 = [phases[3]]
  let input4 = [phases[4]]

  let vm0 = new VM(data.slice(0), () => { return input0.shift() }, (value) => { input1.push(value)})
  let vm1 = new VM(data.slice(0), () => { return input1.shift() }, (value) => { input2.push(value)})
  let vm2 = new VM(data.slice(0), () => { return input2.shift() }, (value) => { input3.push(value)})
  let vm3 = new VM(data.slice(0), () => { return input3.shift() }, (value) => { input4.push(value)})
  let vm4 = new VM(data.slice(0), () => { return input4.shift() }, (value) => { input0.push(value)})

  while(true) {
    vm0.stepUntilOutput()
    vm1.stepUntilOutput()
    vm2.stepUntilOutput()
    vm3.stepUntilOutput()
    let op = vm4.stepUntilOutput()

    if(op == 99)
      break
  }

  return input0[0]
}

function partOne(data) {
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
      largestValue = r4
    }
  }

  console.log(`partOne largestValue = ${largestValue}`)
}

function partTwo(data) {
  let options = [5, 6, 7, 8, 9]
  let indices = permutator(options)
  let largestValue = 0

  for(let seq of indices) {

    let rc = feedbackMode(data.slice(0), seq)
    if(rc > largestValue)
      largestValue = rc
  }

  console.log(`partTwo largest value = ${largestValue}`)
}

if(process.argv[1] === __filename) {
  const data = fs.readFileSync('data/day07_input.txt', 'utf8').split(',').map(x => parseInt(x))

  partOne(data.slice(0))
  partTwo(data.slice(0))
}





