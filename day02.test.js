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

    test('real data', () => {
      
    })
  })

  describe('Puzzle 2', () => {
    test('sample data', () => {
      
    })

    test('real data', () => {
      
    })
  })
})
