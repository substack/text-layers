var test = require('tape')
var layers = require('../')

test('backspace', function (t) {
  var output = layers([
    { text: 'one\ntw_\bo\nthree', x: 0, y: 0 },
    { text: 'hihihi', x: 4, y: 1 }
  ])
  t.equal(output, 'one\ntw_\bo hihihi\nthree')
  t.end()
})
