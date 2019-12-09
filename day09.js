const util = require('util')
const fs = require('fs')

export class VM {
  
  constructor(data, input_callback, output_callback) {
    this._data = data
    this._input_callback = input_callback
    this._output_callback = output_callback
    this._running = false
    this._ip = 0
    this._base = 0
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
    let value = this.data[this.data[this.ip + offset]]
    if(value === undefined) {
      this.data[this.data[this.ip + offset]] = 0
      return 0
    } else {
      return value
    }
  }

  imm(offset) {
    let value = this.data[this.ip + offset]
    if(value === undefined) {
      this.data[this.ip + offset] = 0
      return 0
    } else {
      return value
    }
  }

  rel(offset) {
    let i = this.imm(offset) + this._base
    let value = this.data[this.imm(offset) + this._base]
    // console.log(`rel i = ${i}, base = ${this._base}, offset = ${offset}, value = ${value}`)
    if(value === undefined) {
      this.data[this._base + offset] = 0
      return 0
    } else {
      return value
    }
  }

  setDataPos(loc, value) {
    this._data[this._data[this.ip + loc]] = value
  }

  setDataImm(loc, value) {
    this._data[loc] = value
  }

  setDataRel(loc, value) {
    this._data[this._base + this.imm(loc)] = value
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

    // console.log(opcode)

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
      case 1201: // rel imm pos
        this.setDataPos(3, this.rel(1) + this.imm(2))
        this.incIp(4)
        break
      case 2101: // imm rel pos
        this.setDataPos(3, this.imm(1) + this.rel(2))
        this.incIp(4)
        break
      case 21101: // imm imm rel
        this.setDataRel(3, this.imm(1) + this.imm(2))
        this.incIp(4)
        break
      case 21201: // rel imm rel
        this.setDataRel(3, this.rel(1) + this.imm(2))
        this.incIp(4)
        break
      case 22201: // rel rel rel
        this.setDataRel(3, this.rel(1) + this.rel(2))
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
      case 1202: // relimm pos
        this.setDataPos(3, this.rel(1) * this.imm(2))
        this.incIp(4)
        break
      case 2102: // imm rel pos
        this.setDataPos(3, this.imm(1) * this.rel(2))
        this.incIp(4)
        break
      case 21102: // imm imm rel
        this.setDataRel(3, this.imm(1) * this.imm(2))
        this.incIp(4)
        break
      case 21202: // rel imm rel
        this.setDataRel(3, this.rel(1) * this.imm(2))
        this.incIp(4)
        break

      case 3:  // pos
        this.setDataPos(1, this._input_callback())
        this.incIp(2)
        break
      case 203:  // rel
        this.setDataRel(1, this._input_callback())
        this.incIp(2)
        break

      case 4:  // pos
        this._output_callback(this.pos(1))
        this.incIp(2)
        break
      case 104:  // imm
        this._output_callback(this.imm(1))
        this.incIp(2)
        break
      case 204:  // rel
        this._output_callback(this.rel(1))
        this.incIp(2)
        break

      case 5:  // JT pos pos
        if(this.pos(1) != 0)
          this.setIp(this.pos(2))
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
      case 1205:  // rel imm
        if(this.rel(1) != 0)
          this.setIp(this.imm(2))
        else
          this.incIp(3)
        break
      case 2105:  // imm rel
        if(this.imm(1) != 0)
          this.setIp(this.rel(2))
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
        if(this.imm(1) == 0)
          this.setIp(this.pos(2))
        else
          this.incIp(3)
        break
      case 1006:  // JF pos imm
        if(this.pos(1) == 0)
          this.setIp(this.imm(2))
        else
          this.incIp(3)
        break
      case 1106:  // JF imm imm
        if(this.imm(1) == 0)
          this.setIp(this.imm(2))
        else
          this.incIp(3)
        break
      case 1206:  // rel imm
        if(this.rel(1) == 0)
          this.setIp(this.imm(2))
        else
          this.incIp(3)
        break
      case 2106:  // imm rel
        if(this.imm(1) == 0)
          this.setIp(this.rel(2))
        else
          this.incIp(3)
        break

      case 7:  // LT pos pos pos
        if(this.pos(1) < this.pos(2))
          this.setDataPos(3, 1)
        else
          this.setDataPos(3, 0)
        this._ip += 4
        break
      case 107:  // LT imm pos
        if(this.imm(1) < this.pos(2))
          this.setDataPos(3, 1)
        else
          this.setDataPos(3, 2)
        this._ip += 4
        break
      case 1007:  // LT pos imm pos
        if(this.pos(1) < this.imm(2))
          this.setDataPos(3, 1)
        else 
          this.setDataPos(3, 0)
        this._ip += 4
        break
      case 1107:  // LT imm imm pos
        if(this.imm(1) < this.imm(2))
          this.setDataPos(3, 1)
        else 
          this.setDataPos(3, 0)
        this._ip += 4
        break
      case 1207:  // rel imm pos
        if(this.rel(1) < this.imm(2))
          this.setDataPos(3, 1)
        else 
          this.setDataPos(3, 0)
        this._ip += 4
        break
      case 21107:  // imm imm rel
        if(this.imm(1) < this.imm(2))
          this.setDataRel(3, 1)
        else 
          this.setDataRel(3, 0)
        this._ip += 4
        break
      case 2107:  // imm rel pos
        if(this.imm(1) < this.rel(2))
          this.setDataPos(3, 1)
        else 
          this.setDataPos(3, 0)
        this._ip += 4
        break

      case 8:  // EQ pos pos pos
        if(this.pos(1) == this.pos(2))
          this.setDataPos(3, 1)
        else 
          this.setDataPos(3, 0)
        this._ip += 4
        break
      case 108:  // EQ imm pos pos
        if(this.imm(1) == this.pos(2))
          this.setDataPos(3, 1)
        else 
          this.setDataPos(3, 0)
        this._ip += 4
        break
      case 1008:  // EQ pos imm pos
        if(this.pos(1) == this.imm(2))
          this.setDataPos(3, 1)
        else
          this.setDataPos(3, 0)
        this._ip += 4
        break
      case 1108:  // EQ imm imm pos
        if(this.imm(1) == this.imm(2))
          this.setDataPos(3, 1)
        else
          this.setDataPos(3, 0)
        this._ip += 4
        break
      case 1208:  // rel imm  pos
        if(this.rel(1) == this.imm(2))
          this.setDataPos(3, 1)
        else
          this.setDataPos(3, 0)
        this.incIp(4)
        break
      case 2108:  // imm rel pos
        if(this.imm(1) == this.rel(2))
          this.setDataPos(3, 1)
        else
          this.setDataPos(3, 0)
        this.incIp(4)
        break
      case 21108:  // imm imm rel
        if(this.imm(1) == this.imm(2))
          this.setDataRel(3, 1)
        else
          this.setDataRel(3, 0)
        this._ip += 4
        break

      // Set Relative Base
      case 9:  // pos
        this._base += this.pos(1)
        this.incIp(2)
        break
      case 109:  // imm
        this._base += this.imm(1)
        this.incIp(2)
        break
      case 209:  // rel
        this._base += this.rel(1)
        this.incIp(2)
        break

      default:
        throw(`Unrecognized opcode ${opcode}!`)
    }

    return opcode
  }
}

function partOne(data) {
  function input_callback() {
    return 2
  }

  function output_callback(value) {
    console.log(`: ${value}`)
  }

  let vm = new VM(data, input_callback, output_callback)
  vm.run()
}

if(process.argv[1] === __filename) {
  const data = fs.readFileSync('data/day09_input.txt', 'utf8').split(',').map(x => parseInt(x))

  partOne(data.slice(0))
}





