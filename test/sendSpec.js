var config = require('./config');
var mpanalytics = require('../index');

describe('send', function () {
	var tracker;

	beforeEach('create', function () {
		tracker = mpanalytics.create({
			tid: config.UA,
			cid: Math.random() + 'mocha',
		})
	});

	it('send pageview', function (done) {
		this.timeout(10 * 1000);

		tracker.send({
			v: 1,
			t: 'pageview',
			dh: 'example.com',
			dp: '/pageview',
			plt: 2800,
		}, done);
	});

	it('send page load time', function (done) {
		this.timeout(10 * 1000);

		tracker.send({
			v: 1,
			t: 'timing',
			dh: 'example.com',
			dp: '/test',
			plt: 1322,
		}, done);
	});

	it('send page load time 2', function (done) {
		this.timeout(10 * 1000);

		tracker.send({
			v: 1,
			t: 'timing',
			dh: 'example.com',
			dp: '/test2',
			plt: 300,
		}, done);
	});

	it('send user timing', function (done) {
		this.timeout(10 * 1000);

		tracker.send({
			v: 1,
			t: 'timing',
			utc: 'mycategory',
			utl: 'mylabel',
			utv: 'myvariable',
			utt: 944,
		}, done);
	});
});
