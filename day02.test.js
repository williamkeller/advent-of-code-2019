const fs = require('fs')
const puzzle = require('./day02')

describe('Day 02', () => {
  describe('Puzzle 1', () => {
    test('sample data 1', () => {
      let data = [1,0,0,0,99]
      let result = puzzle.interpreter(data, data[1], data[2])
      expect(result).toEqual(2)
    })

    test('sample data 2', () => {
      let data = [2,3,0,3,99]
      let result = puzzle.interpreter(data, data[1], data[2])
      expect(result).toEqual(2)
    })

    test('sample data 3', () => {
      let data = [2,4,4,5,99,0]
      let result = puzzle.interpreter(data, data[1], data[2])
      expect(result).toEqual(2)
    })

    test('sample data 4', () => {
      let data = [1,1,1,4,99,5,6,0,99]
      let result = puzzle.interpreter(data, data[1], data[2])
      expect(result).toEqual(30)
    })

    test('real data', () => {
      const data = JSON.parse(fs.readFileSync('data/day02_input.json'))
      let result = puzzle.interpreter(data, 12, 2)
      expect(result).toEqual(4090701)
    })
  })

  describe('Puzzle 2', () => {
    test('real data', () => {
      const data = JSON.parse(fs.readFileSync('data/day02_input.json'))
      let result = puzzle.interpreter(data, 64, 21)
      expect(result).toEqual(19690720)
    })
  })
})
