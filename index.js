var spawn       = require('child_process').spawn
  , parse       = require('./mongotop-parser').parse
  , ipMatch     = /connected to: ([\d]+\.[\d]+\.[\d]+\.[\d]|localhost)/
  , child
  
child = spawn('mongotop', ['--host', 'localhost'])
child.stdout.setEncoding('utf8')

child.stdout.on('data', function(data) {

  if (data.match(ipMatch))
    return console.log(data)

  data = parse(data)
  console.log(data)

})
