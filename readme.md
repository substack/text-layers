# text-layers

overlay text regions

# example

This program puts the output of the `cal` command on the left,
and the output of `date` and `uptime` on the right.

```
var layers = require('text-layers')
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
    { text: output[2], x: 23, y: 4 },
    { text: 'HI', x: 3, y: 3 }
  ]))
}
```

output:

```
     June 2016
Su Mo Tu We Th Fr Sa
          1  2  3  4
 5 HI  7  8  9 10 11    Wed Jun 15 23:47:31 CDT 2016
12 13 14 _1_5 16 17 18    23:47:31 up  2:02
19 20 21 22 23 24 25
26 27 28 29 30
```

# api

``` js
var overlay = require('text-layers')
```

## var output = overlay(layers)

Create a string of `output` from an array of `layers`.

Each `layer` in the `layers` array can have:

* `layer.text` - the string to overlay
* `layer.x` - the x offset, left to right, starting at 0
* `layer.y` - the y offset, top to bottom, starting at 0

If the `layer` is a string, its contents are used as the `text` property with an
`x` and `y` of `0`.

# license

BSD

# install

```
npm install text-layers
```
