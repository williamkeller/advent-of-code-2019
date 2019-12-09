const { VM, feedbackMode } = require('../day07')

describe('VM regression tests', () => {
  describe('Basic setup', () => {
    test('in and out', (done) => {
      let data = [3,5,4,5,99,-1]

      function input() {
        return 1
      }
      function output(value) {
        expect(value).toEqual(1)
        done()
      }

      let vm = new VM(data, input, output)
      vm.run()
    })
  })

  describe('Larger example', () => {
    const data = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
      1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
      999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]

    test('Less than 8', (done) => {
      function output(value) {
        expect(value).toEqual(999)
        done()
      }

      function input() {
        return 7
      }

      new VM(data.slice(0), input, output).run()
    })

    test('Equal to 8', (done) => {
      function output(value) {
        expect(value).toEqual(1000)
        done()
      }

      function input() {
        return 8
      }

      new VM(data.slice(0), input, output).run()
    })

    test('Greater than 8', (done) => {
      function output(value) {
        expect(value).toEqual(1001)
        done()
      }

      function input() {
        return 9
      }

      new VM(data.slice(0), input, output).run()
    })
  })
})

describe('Step functions', () => {
  test('step', () => {
    let data = [1,5,6,7,99,0,0,0]

    function input() {
      return 0
    }

    function output(value) {
    }

    let vm = new VM(data, input, output)
    expect(vm.step()).toEqual(1)
    expect(vm.step()).toEqual(99)
  })

  test('stepUntilOutput', (done) => {
    let data = [1,15,16,17,1,15,16,17,1,15,16,17,4,17,99,1,2,0]

    function input() {
      return 0
    }

    function output(value) {
      done()
    }

    let vm = new VM(data, input, output)
    expect(vm.stepUntilOutput()).toEqual(4)
    expect(vm.step()).toEqual(99)
  })
})

describe('Day 7', () => {
  describe('Part two', () => {
    test('Example 1', () => {
      let data = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,
        27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5]
      let phases = [9,8,7,6,5]

      expect(feedbackMode(data, phases)).toEqual(139629729)
    })

    test('Example 2', () => {
      let data = [3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,
      -5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,
      53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10]
      let phases = [9,7,8,5,6]

      expect(feedbackMode(data, phases)).toEqual(18216)
    })
  })
})
