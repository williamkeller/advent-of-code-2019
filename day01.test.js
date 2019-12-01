const puzzle = require('./day01')

describe('Day 01', () => {
  describe('Puzzle 1', () => {
    test('sample data', () => {
      expect(puzzle.fuel_for_mass(12)).toEqual(2)
      expect(puzzle.fuel_for_mass(14)).toEqual(2)
      expect(puzzle.fuel_for_mass(1969)).toEqual(654)
      expect(puzzle.fuel_for_mass(100756)).toEqual(33583)
    })

    test('real data', (done) => {
      function callback(value) {
        expect(value).toEqual(3365459)
        done()
      }
      puzzle.puzzle(puzzle.fuel_for_mass, callback)
    })
  })

  describe('Puzzle 2', () => {
    test('sample data', () => {
      expect(puzzle.recursive_fuel_for_mass(14)).toEqual(2)
      expect(puzzle.recursive_fuel_for_mass(1969)).toEqual(966)
      expect(puzzle.recursive_fuel_for_mass(100756)).toEqual(50346)
    })

    test('real data', (done) => {
      function callback(value) {
        expect(value).toEqual(5045301)
        done()
      }
      puzzle.puzzle(puzzle.recursive_fuel_for_mass, callback)
    })
  })
})
