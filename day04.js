


export function findPasswordRange(start, finish) {
  let count = 0

  start = parseInt(start)
  finish = parseInt(finish)

  for(let i = start; i <= finish; i++) {
    if(isValidPassword(i.toString())) {
      console.log(i.toString())
      count += 1
    }
  }

  return count
}

export function isValidPassword(pwd) {
  let adjCount = 0
  let adjCounts = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

  for(let i = 0; i < 5; i++) {
    if(parseInt(pwd[i]) > parseInt(pwd[i + 1])) {
      return false
    }
    if(parseInt(pwd[i]) == parseInt(pwd[i + 1])) {
      adjCounts[pwd[i]] += 1
      adjCount += 1
    }
  }

  // console.log(pwd)
  // console.log(adjCounts)
  for(let a of adjCounts) {
    if(a == 2)
      return true
  }

  return false
}


if(process.argv[1] === __filename) {

  // console.log(isValidPassword('111111'))
  // console.log(isValidPassword('223450'))
  // console.log(isValidPassword('123789'))

  // console.log(isValidPassword('112233'))
  // console.log(isValidPassword('123444'))
  // console.log(isValidPassword('111122'))

  let r = findPasswordRange('172930', '683082')
  console.log(r)
}

