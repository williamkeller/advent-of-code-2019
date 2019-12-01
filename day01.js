const utils = require('../utils')

function fuel_for_mass(mass) {
  return Math.floor(mass / 3.0) - 2
}

function recursive_fuel_for_mass(mass) {
  let fuel = Math.floor(mass / 3.0) - 2
  if(fuel > 0)
    return fuel + recursive_fuel_for_mass(fuel)
  else
    return 0
}

function puzzle(calculator) {
  let total_fuel = 0

  utils.readInputFile('../01/input1.txt', (mass) => {
    if(mass == null) {
      console.log(`puzzle1 total_fuel = ${total_fuel}`)
    } else {
      total_fuel += calculator(mass)
    }
  })
}

puzzle(fuel_for_mass)
puzzle(recursive_fuel_for_mass)
