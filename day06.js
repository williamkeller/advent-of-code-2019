const fs = require('fs')
const util = require('util')

function buildOrbitGraph(orbits) {
  let graph = {}

  for(let orbit of orbits) {
    let parts = orbit.split(')')
    graph[parts[1]] = { parent: parts[0] }
  }

  return graph
}

function buildOrbitChainFromPoint(graph, point) {
  let child = graph[point]
  let chain = []
  let length = 0

  while(true) {
    let parent = child.parent
    if(parent == '')
      break

    length += 1
    chain.push([parent, length])

    child = graph[parent]
    if(child === undefined)
      break
  }

  return chain
}

function countOrbits(graph) {
  let count = 0

  for(let body in graph) {
    let child = graph[body]
    while(true) {
      let parent = child.parent
      if(parent == '')
        break
      count += 1

      child = graph[parent]
      if(child === undefined)
        break
    }
  }

  return count
}

if(process.argv[1] === __filename) {
  const data = fs.readFileSync('data/day06_input.txt', 'utf8').split('\n')
  //const data = fs.readFileSync('data/day06_input2.test.txt', 'utf8').split('\n')
  let graph = buildOrbitGraph(data)
  let you = buildOrbitChainFromPoint(graph, 'YOU')
  let san = buildOrbitChainFromPoint(graph, 'SAN')

  let match = false
  for(let y of you) {
    for(let s of san) {
      if(y[0] === s[0]) {
        console.log('Match!')
        console.log(`${y[1] + s[1]}`)
        match = true
      }
      if(match) break
    }
    if(match) break
  }
}
