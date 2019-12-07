
const fs = require('fs')
const aoc = require('./day05')

describe('Day 05', () => {
  describe('Puzzle 2', () => {

    describe('OUT instruction', () => {
      test('direct arg', (done) => {
        function callback(value) {
          expect(value).toEqual(1)
          done()
        }

        aoc.interpreter([104,1,99], [1], callback)
      })

      test('indirect arg', (done) => {
        function callback(value) {
          expect(value).toEqual(99)
          done()
        }

        aoc.interpreter([4,2,99], [1], callback)
      })
    })

    test('IN instruction', (done) => {
      function callback(value) {
        expect(value).toEqual(3)
        done()
      }

      aoc.interpreter([3, 5, 4, 5, 99, 0], [3], callback)
    })

    describe('ADD instruction', () => {
      let data = [3, 2, 0, 9, 10, 11, 4, 11, 99, 15, 18, 0]
      test('indirect indirect', (done) => {
        function callback(value) {
          expect(value).toEqual(33)
          done()
        }

        aoc.interpreter(data, [1], callback)
      })

      test('direct indirect', (done) => {
        function callback(value) {
          expect(value).toEqual(27)
          done()
        }

        aoc.interpreter(data, [101], callback)
      })

      test('indirect direct', (done) => {
        function callback(value) {
          expect(value).toEqual(25)
          done()
        }

        aoc.interpreter(data, [1001], callback)
      })

      test('direct direct', (done) => {
        function callback(value) {
          expect(value).toEqual(19)
          done()
        }

        aoc.interpreter(data, [1101], callback)
      })
    })

    describe('MULT instruction', () => {
      let data = [3, 2, 0, 9, 10, 11, 4, 11, 99, 15, 18, 0]
      test('indirect indirect', (done) => {
        function callback(value) {
          expect(value).toEqual(270)
          done()
        }

        aoc.interpreter(data, [2], callback)
      })

      test('direct indirect', (done) => {
        function callback(value) {
          expect(value).toEqual(162)
          done()
        }

        aoc.interpreter(data, [102], callback)
      })

      test('indirect direct', (done) => {
        function callback(value) {
          expect(value).toEqual(150)
          done()
        }

        aoc.interpreter(data, [1002], callback)
      })

      test('direct direct', (done) => {
        function callback(value) {
          expect(value).toEqual(90)
          done()
        }

        aoc.interpreter(data, [1102], callback)
      })
    })

    describe('Equal to', () => {
      test('postion mode equals', (done) => {
        function callback(value) {
          expect(value).toEqual(1)
          done()
        }

        aoc.interpreter([3,9,8,9,10,9,4,9,99,-1,8], [8], callback)
      })

      test('postion mode does not equal', (done) => {
        function callback(value) {
          expect(value).toEqual(0)
          done()
        }

        aoc.interpreter([3,9,8,9,10,9,4,9,99,-1,8], [1], callback)
      })

      test('immediate mode equals', (done) => {
        function callback(value) {
          expect(value).toEqual(1)
          done()
        }

        aoc.interpreter([3,3,1108,-1,8,3,4,3,99], [8], callback)
      })

      test('immediate mode does not equal', (done) => {
        function callback(value) {
          expect(value).toEqual(0)
          done()
        }

        aoc.interpreter([3,3,1108,-1,8,3,4,3,99], [0], callback)
      })
    })

    describe('Less than', () => {
      test('postion mode less than', (done) => {
        function callback(value) {
          expect(value).toEqual(1)
          done()
        }

        aoc.interpreter([3,9,7,9,10,9,4,9,99,-1,8], [3], callback)
      })

      test('postion mode is not less than', (done) => {
        function callback(value) {
          expect(value).toEqual(0)
          done()
        }

        aoc.interpreter([3,9,7,9,10,9,4,9,99,-1,8], [10], callback)
      })

      test('immediate mode less than', (done) => {
        function callback(value) {
          expect(value).toEqual(1)
          done()
        }

        aoc.interpreter([3,3,1107,-1,8,3,4,3,99], [4], callback)
      })

      test('immediate mode is not less than', (done) => {
        function callback(value) {
          expect(value).toEqual(0)
          done()
        }

        aoc.interpreter([3,3,1107,-1,8,3,4,3,99], [10], callback)
      })
    })

    describe('jump tests', () => {
      test('position mode true', (done) => {
        function callback(value) {
          expect(value).toEqual(1)
          done()
        }

        aoc.interpreter([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], [1],
          callback)
      })

      test('position mode false', (done) => {
        function callback(value) {
          expect(value).toEqual(0)
          done()
        }

        aoc.interpreter([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], [0],
          callback)
      })

      test('immediate mode true', (done) => {
        function callback(value) {
          expect(value).toEqual(1)
          done()
        }

        aoc.interpreter([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], [1],
          callback)
      })

      test('immediate mode false', (done) => {
        function callback(value) {
          expect(value).toEqual(0)
          done()
        }

        aoc.interpreter([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], [0],
          callback)
      })
    })

    describe('Larger example', () => {
      test('Less than 8', (done) => {
        function callback(value) {
          expect(value).toEqual(999)
          done()
        }

        aoc.interpreter([3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
        1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
        999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99], [7], callback)
      })

      test('Equal to 8', (done) => {
        function callback(value) {
          expect(value).toEqual(1000)
          done()
        }

        aoc.interpreter([3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
        1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
        999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99], [8], callback)
      })

      test('Greater than 8', (done) => {
        function callback(value) {
          expect(value).toEqual(1001)
          done()
        }

        aoc.interpreter([3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
        1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
        999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99], [9], callback)
      })
    })
  })
})
