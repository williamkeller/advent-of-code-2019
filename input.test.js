const input = require('./input')

describe('Input Library', () => {
  describe('readByLineAsync', () => {
    test('reads the proper number of lines', (done) => {
      let lineCount = 0

      function callback(line) {
        lineCount += 1
        if(lineCount === 10)
          done()
      }

      input.readByLine('./test_fixtures/data_as_lines.txt', callback)
    })

    test('receives a null terminator', (done) => {

      function callback(line) {
        if(line === null)
          done()
      }

      input.readByLine('./test_fixtures/data_as_lines.txt', callback)
    })
  })
})
