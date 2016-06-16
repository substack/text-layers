var test = require('tape')
var layers = require('../')

test('control', function (t) {
  var output = layers([
    { text: 'one\ntwo\nthree', x: 0, y: 0 },
    { text: 'hihihi', x: 4, y: 1 }
  ])
  t.equal(output, 'one\ntwo hihihi\nthree')
  t.end()
})

test('backspace', function (t) {
  var output = layers([
    { text: 'one\ntw_\bo\nthree', x: 0, y: 0 },
    { text: 'abcdef', x: 4, y: 1 }
  ])
  t.equal(output, 'one\ntw_\bo abcdef\nthree')
  t.end()
})
