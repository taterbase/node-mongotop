module.exports = {parse: parse}

const fields = [ 'total' , 'read' , 'write' ]

function parse(data) {
  var collections = {}

  data.split('\n').filter(function(d) {
    return !!d && !d.match(/(ns|total|read|write)/)
  }).map(function(d) {
    return d.replace(/^\s+/, '').replace(/\s+/g, '|')
  }).forEach(function(d) {
    var datas = d.split('|')
      , name  = datas.splice(0, 1)

    collections[name] = {}

    datas.forEach(function(stat, index) {
      collections[name][fields[index]] = stat
    })

  })

  return collections
}
