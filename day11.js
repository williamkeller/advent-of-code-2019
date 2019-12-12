const fs = require("fs")
const { IntCode } = require('./intcode')

export function createGrid(grid_size) {
  let grid = []
  for(let i = 0; i < grid_size; i++) {
    let row = []
    for(let j = 0; j < grid_size; j++) {
      row.push([0, false])  // color, painted
    }
    grid.push(row)
  }

  return grid
}

function runPaintingRobot(grid, gridSize) {
  let program = fs.readFileSync('data/day11.input.txt', 'utf8').split(',').map(x => parseInt(x))

  let rx = gridSize / 2
  let ry = gridSize / 2
  let dir = 0  // 0 = up, 1 = right, 2 = down, 3 = left


  function input_handler() {
    return grid[ry][rx][0]
  }

  let paintColor = null
  let direction = null

  function output_handler(value) {

    if(paintColor === null) {
      paintColor = parseInt(value)
      return
    }

    direction = parseInt(value)

    grid[ry][rx][0] = paintColor
    grid[ry][rx][1] = true

    switch(dir) {
      case 0:
        dir = (direction == 0) ? 3 : 1
        break
      case 1:
        dir = (direction == 0) ? 0 : 2
        break
      case 2:
        dir = (direction == 0) ? 1 : 3
        break
      case 3:
        dir = (direction == 0) ? 2 : 0
        break
    }

    switch(dir) {
      case 0:
        ry -= 1
        break
      case 1:
        rx += 1
        break
      case 2:
        ry += 1
        break
      case 3:
        rx -= 1
        break
    }

    paintColor = null
    direction = null
  }

  grid[ry][rx][0] = 1

  let vm = new IntCode(program, input_handler, output_handler)
  vm.run()

  return grid
}

function day1(grid) {
  let count = 0

  for(let row of grid) {
     for(let cell of row ) {
       if(cell[1] == true)
         count += 1
     }
  }
  console.log(`Count: ${count}`)
}

function day2(grid) {
  for(let row of grid) {
    console.log(row.map((x) => { 
      return x[0] == 0 ? '#' : ' '
    }).join(''))
  }
}


if(process.argv[1] == __filename) {

  const GRID_SIZE = 200

  let grid = createGrid(GRID_SIZE)
  runPaintingRobot(grid, GRID_SIZE)

  day1(grid)
  day2(grid)
}



