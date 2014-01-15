var spawn  = require('child_process').spawn
  , stream = require('mongotop-parser').stream
  , child


module.exports = function mongotop (opts) {
  opts = opts || {}

  opts.host = opts.host || '127.0.0.1'

  if(!opts.port && !opts.host.match(':'))
    opts.port = '27017'

  var args = []
    , locks = false

  Object.keys(opts).forEach(function(key) {
    if (key === 'locks') {
      locks = opts[key]
      return args = args.concat('--locks')
    }

    args = args.concat(['--' + key, '' + opts[key]])
  })

  var mstream = new stream({locks: locks})

  child = spawn('mongotop', args)
  child.stdout.setEncoding('utf8')
  child.stderr.setEncoding('utf8')

  child.stderr.on('data', mstream.emit.bind(mstream, 'error'))

  return child.stdout.pipe(mstream)
}
