var layers = require('../')
var exec = require('child_process').exec

exec('cal', function (err, cal) {
  exec('date', function (err, date) {
    process.stdout.write(layers([
      cal, { x: 24, y: 3, text: date }
    ]))
  })
})
