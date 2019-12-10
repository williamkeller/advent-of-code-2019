const fs = require("fs")


function asteroidLocations(data) {
  let locations = []

  for(let i = 0; i < data.length; i++) {
    for(let j = 0; j < data[i].length; j++) {
      if(data[i][j] === '#')
        locations.push([j, i, false])
    }
  }

  return locations
}


function distance(l1, l2) {
  let x = l2[0] - l1[0]
  let y = l2[1] - l1[1]
  return Math.sqrt((x * x) + (y * y))
}

if(process.argv[1] == __filename) {
  let data = fs.readFileSync('data/day10_input.txt', 'utf8')
  let cells = data.split('\n').map(x => x.split(''))
  let output = []

  let locs = asteroidLocations(cells)

  for(let l1 of locs) {  //  .slice(0, 1)) {
    locs.forEach(x => x[2] = false)

    for(let l2 of locs) {
      if(l1 === l2)
        continue
      for(let l3 of locs) {
        if(l1 === l3)
          continue
        if(l2 === l3)
          continue
        if(l3[2] == true)
          continue

        let d1 = Math.abs(distance(l1, l2))
        let d2 = Math.abs(distance(l2, l3))
        let d3 = Math.abs(distance(l1, l3))

        if(d1 + d2 > (d3 - 0.000001) && d1 + d2 < (d3 + 0.000001)) {
          l3[2] = true
        }
      }
    }
    let occluded = locs.filter(x => x[2] == true).length
    output.push([l1[0],l1[1],occluded])
  }

  output.sort((a, b) => { return a[2] - b[2] })
  for(let o of output) {
    console.log(`${o[0]},${o[1]}    ${o[2]} occluded, ${locs.length - o[2] - 1} visible`)
  }
}
