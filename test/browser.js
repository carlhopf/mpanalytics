var mpanalytics = require('../index');
var config = require('./config');

var tracker = mpanalytics.create({
	tid: config.UA,
	cid: Math.random() + 'browser',
});

tracker.pageview({
	hostname: 'example.com',
	page: '/home',
  title: 'Home'
}, function (err) {
	console.log(err);
});

tracker.event({
	category: 'test',
	action: 'alright',
});
