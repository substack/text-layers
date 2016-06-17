var ansi = require('ansi-regex')()

module.exports = function (layers) {
  var output = []
  layers.forEach(function (layer) {
    if (typeof layer === 'string') {
      layer = { x: 0, y: 0, text: layer }
    }
    var xpre = Array(layer.x+1).join(' ')
    var ypre = Array(layer.y).map(function (x) { return xpre })
    var lines = ypre.concat(layer.text.split('\n')
      .map(function (c) { return xpre + c }))
    lines.forEach(function (line, i) {
      output[i] = merge(output[i] || '', line)
    })
  })
  return output.join('\n')
}

function merge (a, b) {
  var m
  var output = []
  var len = Math.max(a.length, b.length)
  var extra = 0
  var re = RegExp('^' + ansi.source)
  for (var i = 0, j = 0; i < len + extra; i++, j++) {
    var ca = a.charAt(i) || ' '
    var ca1 = a.charAt(i+1)
    var cb = b.charAt(j) || ' '
    var cb1 = b.charAt(j+1)
    if (cb1 === '\b') {
      i--
      j++
      extra += 2
      output.push(cb, cb1)
    } else if (ca1 === '\b') {
      i++
      j--
      extra += 2
      output.push(ca, ca1)
    } else if (m = re.exec(a.slice(i))) {
      i += m[0].length - 1
      j--
      extra += m[0].length
      output.push(m[0])
    } else if (m = re.exec(b.slice(j))) {
      i--
      j += m[0].length - 1
      extra += m[0].length
      output.push(m[0])
    } else {
      output.push(cb === ' ' ? ca : cb)
    }
  }
  return output.join('').replace(/\s+$/,'')
}
