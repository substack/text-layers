module.exports = function (layers) {
  var output = []
  layers.forEach(function (layer) {
    if (typeof layer === 'string') {
      layer = { x: 0, y: 0, text: layer }
    }
    var xpre = Array(layer.x+1).join(' ')
    var ypre = Array(layer.y+1).map(function (x) { return xpre })
    var lines = ypre.concat(layer.text.split('\n')
      .map(function (c) { return xpre + c }))
    lines.forEach(function (line, i) {
      output[i] = merge(output[i] || '', line)
    })
  })
  return output.join('\n')
}

function merge (a, b) {
  var output = []
  for (var i = 0; i < b.length; i++) {
    var ca = a.charAt(i) || ' '
    var cb = b.charAt(i)
    output.push(cb === ' ' ? ca : cb)
  }
  return output.join('')
}
