const input = require('./input')

export function fuel_for_mass(mass) {
  return Math.floor(mass / 3.0) - 2
}

export function recursive_fuel_for_mass(mass) {
  let fuel = Math.floor(mass / 3.0) - 2
  if(fuel > 0)
    return fuel + recursive_fuel_for_mass(fuel)
  else
    return 0
}

export function puzzle(calculator, callback) {
  let total_fuel = 0

  input.readByLine('data/day01_input.txt', (mass) => {
    if(mass !== null) {
      total_fuel += calculator(mass)
    }
    else {
      callback(total_fuel)
    }
  })
}

if(process.argv[1] === __filename) {
  puzzle(fuel_for_mass, (value) => { console.log(`puzzle1: ${value}`) })
  puzzle(recursive_fuel_for_mass, (value) => { console.log(`puzzle2: ${value}`) })
}
