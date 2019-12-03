const fs = require('fs')

export function buildCellList(cmds) {
  let cells = []
  let x = 0
  let y = 0
  let steps = 0

  cmds.split(',').forEach((cmd) => {
    let dir = cmd[0]
    let len = parseInt(cmd.slice(1))


    switch(dir) {
      case 'R':
        for(let i = 0; i < len; i++) {
          steps += 1
          x += 1
          cells.push([x, y, steps])
        }
        break
      case 'U':
        for(let i = 0; i < len; i++) {
          steps += 1
          y += 1
          cells.push([x, y, steps])
        }
        break
      case 'L':
        for(let i = 0; i < len; i++) {
          steps += 1
          x -= 1
          cells.push([x, y, steps])
        }
        break
      case 'D':
        for(let i = 0; i < len; i++) {
          steps += 1
          y -= 1
          cells.push([x, y, steps])
        }
        break
    }
  })

  return cells
}

if(process.argv[1] === __filename) {
  let lines = fs.readFileSync('data/day03_input.txt', 'utf8').split('\n')
  let wire1 = lines[0]
  let wire2 = lines[1]

  // let wire1 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72'
  // let wire2 = 'U62,R66,U55,R34,D71,R55,D58,R83'

  // let wire1 = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51'
  // let wire2 = 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'

  let cells1 = buildCellList(wire1)
  let cells2 = buildCellList(wire2)
  let count = 0

  let intersections = []
  cells1.forEach((cell1) => {
    cells2.forEach((cell2) => {
      if(cell1[0] === cell2[0] && cell1[1] === cell2[1]) {
        count += 1
        intersections.push([cell1[0], cells1[1], cell1[2] + cell2[2]])
      }
    })
  })

  intersections.forEach((intersect) => {
    console.log(`${intersect[2]}`)
  })
  // console.log(intersections)
}


