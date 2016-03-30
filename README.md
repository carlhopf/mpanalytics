mpanalytics
===========

Simple wrapper around google analytics measurement protocol, which works both
clientside (using browserify) and serverside (using nodejs xmlhttpreqest
wrapper package).

For testing please provide your own property id in test/config.js

```
var mpanalytics = require('../index');

var tracker = mpanalytics.create({
	tid: 'UA-...',
	cid: 'my anonymous client identifier',
	sampleRate: 100,
});

tracker.pageview({
	hostname: 'example.com',
	page: '/home',
}, function (err) {
	console.log(err);
});

tracker.event({
	category: 'test',
	action: 'alright',
});

```


Chrome apps
-----------

The policy definition in your manifest.json might look like:

```
"content_security_policy": "script-src 'self' https://www.google-analytics.com; object-src 'self'",
```



Tested on
---------

- iOS 9.3
- Chrome 49
