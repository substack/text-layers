var test = require('tape')
var layers = require('../')

var fs = require('fs')
var path = require('path')

var files = {}
;['cal','date','uptime','expected'].forEach(function (key) {
  var file = path.join(__dirname, 'files/layers', key+'.txt')
  files[key] = fs.readFileSync(file, 'utf8')
})

test('layers', function (t) {
  var output = layers([
    { text: files.cal, x: 0, y: 0 },
    { text: files.date, x: 24, y: 3 },
    { text: files.uptime, x: 23, y: 4 },
    { text: 'HI', x: 3, y: 3 }
  ])
  t.equal(output, files.expected)
  t.end()
})
