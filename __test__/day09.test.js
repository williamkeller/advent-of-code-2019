const { VM, feedbackMode } = require('../day09')

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

describe('Day 9', () => {

  test('handles large numbers', (done) => {
    let largeNumber = 1125899906842624
    function input_callback() {
    }

    function output_callback(value) {
      expect(value).toEqual(largeNumber)
      done()
    }

    new VM([104,largeNumber,99], input_callback, output_callback).run()
  })

  test('handles', (done) => {
    let data = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99]
    let output = []

    function input_callback() {
      return 0
    }

    function output_callback(value) {
      output.push(value)
      if(output.length === data.length) {
        let valid = true
        for(let a in data) {
          if(output[a] !== data[a]) {
            valid = false
            break
          }
        }
        expect(valid).toEqual(true)
        done()
      }
    }

    new VM(data.slice(0), input_callback, output_callback).run()

  })
})
