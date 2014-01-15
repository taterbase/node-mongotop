node-mongotop
=============

Simple interface to `mongotop` for Node.js. Requires [mongotop](http://docs.mongodb.org/v2.2/reference/mongotop/) to be installed.

### Usage

```javascript
var mtop = require('mongotop')
  , stream = mtop({
	  	    ipv6: true, 
  		    locks: true, 
		    host: 'localhost', 
		    port: '27017', 
		    username: 'jim', 
		    password: 'password', 
		    sleep: 30
		  })

stream.on('data', function(data) {
  //Do things with the data
})

stream.on('error', function(error) {
  //Do things with the error
})

stream.pipe(someWriteableStream)
```

######Made with love by [@taterbase](http://twitter.com/taterbase)
