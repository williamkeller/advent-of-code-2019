
export function findPasswordRange(start, finish, validFunc) {
  let count = 0

  start = parseInt(start)
  finish = parseInt(finish)

  for(let i = start; i <= finish; i++) {
    if(validFunc(i.toString())) {
      count += 1
    }
  }

  return count
}

export function isValidPassword1(pwd) {
  let adjCount = 0

  for(let i = 0; i < 5; i++) {
    if(parseInt(pwd[i]) > parseInt(pwd[i + 1])) {
      return false
    }
    if(parseInt(pwd[i]) == parseInt(pwd[i + 1])) {
      adjCount += 1
    }
  }

  return adjCount > 0
}

export function isValidPassword2(pwd) {
  let adjCounts = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

  for(let i = 0; i < 5; i++) {
    if(parseInt(pwd[i]) > parseInt(pwd[i + 1])) {
      return false
    }
    if(parseInt(pwd[i]) == parseInt(pwd[i + 1])) {
      adjCounts[pwd[i]] += 1
    }
  }

  for(let a of adjCounts) {
    if(a == 2)
      return true
  }

  return false
}


if(process.argv[1] === __filename) {

  let r
  r = findPasswordRange('172930', '683082', isValidPassword1)
  console.log(`puzzle 1: ${r}`)

  r = findPasswordRange('172930', '683082', isValidPassword2)
  console.log(`puzzle 2: ${r}`)
}

