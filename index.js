var spawn  = require('child_process').spawn
  , stream = require('mongotop-parser').stream
  , child


module.exports = function mongotop (uri, opts) {
  uri  = uri  || ''
  opts = opts || {}

  if(!uri && !opts.host)
    opts.host = '127.0.0.1'

  if(!opts.port && (!!opts.host && !opts.host.match(':')) && !uri.match(':'))
    opts.port = '27017'

  var args = []
    , mstream = new stream()

  Object.keys(opts).forEach(function(key) {
    args = args.concat(['--' + key, '' + opts[key]])
  })

  if(!!uri)
    args.push(uri)

  child = spawn('mongotop', args)
  child.stdout.setEncoding('utf8')
  child.stderr.setEncoding('utf8')

  child.stderr.on('data', mstream.emit.bind(mstream, 'error'))

  return child.stdout.pipe(mstream)
}
