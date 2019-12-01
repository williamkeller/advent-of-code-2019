const utils = require('./utils')

module.exports = {
  fuel_for_mass: function(mass) {
    return Math.floor(mass / 3.0) - 2
  },

  recursive_fuel_for_mass: function(mass) {
    let fuel = Math.floor(mass / 3.0) - 2
    if(fuel > 0)
      return fuel + module.exports.recursive_fuel_for_mass(fuel)
    else
      return 0
  },

  puzzle: function(calculator, callback) {
    let total_fuel = 0

    utils.readInputFile('data/day01_input.txt', (mass) => {
      if(mass !== null) {
        total_fuel += calculator(mass)
      }
      else {
        callback(total_fuel)
      }
    })
  }
}

if(process.argv[1] === __filename) {
  module.exports.puzzle(module.exports.fuel_for_mass, (value) => { console.log(`puzzle1: ${value}`) })
  module.exports.puzzle(module.exports.recursive_fuel_for_mass, (value) => { console.log(`puzzle2: ${value}`) })
}
