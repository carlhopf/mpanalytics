mpanalytics
===========

Simple wrapper around google analytics measurement protocol, supporting both nodejs and browsers thanks to [superagent](https://github.com/visionmedia/superagent).

For testing please provide your own property id in test/config.js


### Example

```javascript
import mpanalytics from 'mpanalytics';

const tracker = mpanalytics.create({
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
```


track events

```javascript
tracker.event({
	category: 'foo',
	action: 'bar',
});

```

### Options

`mpanalytics.create` supports the following options:

*  **cid**: Client ID (pseudonymously identifies a particular user/device)
*  **tid**: Tracking ID / Web Property ID
*  **sampleRate**: Only send a sample based on cid+tid, 0 to 100 (default)


### Chrome apps

The policy definition in your manifest.json might look like:

```
"content_security_policy": "script-src 'self' https://www.google-analytics.com; object-src 'self'",
```



Tested on
---------

- iOS 9.3
- Chrome 49
