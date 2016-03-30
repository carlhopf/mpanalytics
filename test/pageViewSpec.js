var config = require('./config');
var mpanalytics = require('../index');

describe('pageview', function () {
	var tracker;

	beforeEach('create', function () {
		tracker = mpanalytics.create({
			tid: config.UA,
			cid: Math.random() + 'mocha',
		})
	});

	it('send', function (done) {
		tracker.pageview({
			hostname: 'example.com',
			page: '/home',
		}, done);
	});
});
