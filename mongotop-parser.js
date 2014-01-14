module.exports = {parse: parse}

const fields = [ 'ns', 'total' , 'read' , 'write' ]

function parse(data) {
  var collections = []

  data.split('\n').filter(function(d) {
    return !!d && !d.match(/(ns|total|read|write)/)
  }).map(function(d) {
    return d.replace(/^\s+/, '').replace(/\s+/g, '|')
  }).forEach(function(d) {
    var collection = {}

    d.split('|').forEach(function(stat, index) {
      collection[fields[index]] = stat
    })

    collections.push(collection)
  })

  return collections
}
