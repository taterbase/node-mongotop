var spawn  = require('child_process').spawn
  , stream = require('mongotop-parser').stream
  , child


module.exports = function mongotop (opts) {
  opts = opts || {}

  opts.host = opts.host || '127.0.0.1'

  if(!opts.port && !opts.host.match(':'))
    opts.port = '27017'

  var args = []
    , sleep = 1
    , locks = false

  Object.keys(opts).forEach(function(key) {
    switch (key) {
      case 'locks':
        if (opts['locks'])
          args = args.concat('--locks')
        locks = opts[key]
        break
      case 'ipv6':
        if (opts['ipv6'])
          args = args.concat('--ipv6')
        break
      case 'sleep':
        sleep = opts[key]
        break
      default:
        args = args.concat(['--' + key, '' + opts[key]])
    }
  })

  args.push(sleep)

  var mstream = new stream({locks: locks})

  child = spawn('mongotop', args)
  child.stdout.setEncoding('utf8')
  child.stderr.setEncoding('utf8')

  child.stderr.on('data', mstream.emit.bind(mstream, 'error'))

  return child.stdout.pipe(mstream)
}
