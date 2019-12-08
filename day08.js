const fs = require('fs')

if(process.argv[1] === __filename) {
  let data = fs.readFileSync('data/day08_input.txt', 'utf8').split('').map(x => parseInt(x))
  let layerSize = 25 * 6
  let dataSize = data.length
  let layerCount = dataSize / layerSize

  let layers = []

  for(let i = 0; i < layerCount; i++)
    layers.push([0, 0, 0, 0, 0])

  for(let i = 0; i < layerCount; i++) {
    let offset = i * layerSize
    for(let j = offset; j < offset + layerSize; j++)
      layers[i][data[j]] += 1
  }

  layers.sort((a, b) => { return a[0] - b[0] })
  console.log('part one output')
  console.log(layers.slice(1, 2))
  
  let output = []

  for(let i = 0; i < 25; i++) {
    for(let j = 0; j < 6; j++) {
      for(let k = 0; k < 100; k++) {
        let cell = data[k * layerSize + j * 25 + i]

        if(cell == 0) {
          output[j * 25 + i] = ' '
          break
        }
        else if(cell == 1) {
          output[j * 25 + i] = '*'
          break
        }
      }
    }
  }

  console.log('part two output')
  let rowLength = 25 
  console.log(output.slice(rowLength * 0, rowLength * 1).join(''))
  console.log(output.slice(rowLength * 1, rowLength * 2).join(''))
  console.log(output.slice(rowLength * 2, rowLength * 3).join(''))
  console.log(output.slice(rowLength * 3, rowLength * 4).join(''))
  console.log(output.slice(rowLength * 4, rowLength * 5).join(''))
  console.log(output.slice(rowLength * 5, rowLength * 6).join(''))
}

