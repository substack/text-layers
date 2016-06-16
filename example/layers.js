var layers = require('../')
var exec = require('child_process').exec

var pending = 3
var commands = [ 'cal', 'date', 'uptime | sed s/,.*//' ]
var output = []

commands.forEach(function (cmd, i) {
  exec(cmd, function (err, stdout) {
    output[i] = stdout
    if (--pending === 0) show()
  })
})

function show () {
  process.stdout.write(layers([
    { text: output[0], x: 0, y: 0 },
    { text: output[1], x: 24, y: 3 },
    { text: output[2], x: 24, y: 4 },
  ]))
}
