var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var querystring = require('querystring');
var hash = require('./hash');

/**
 * @param {string} options.uris - URIs to send post events to.
 * @param {string} options.path - Path for tracking request.
 * @param {number} options.sampleRate - From 0 to 100, defaults to 100.
 */
function Service (options) {
  this.options = options;
  if (!options.tid) throw new Error('options.tid missing');
  if (!options.cid) throw new Error('options.cid missing');

  this.tid = options.tid;
  this.cid = options.cid || 'N/A';
  this.uri = options.uri || 'https://www.google-analytics.com/collect';
  this.path = options.path || '/collect';
  this.sampleRate = options.sampleRate || 100;
}

/**
 * Send a hit.
 *
 * @param {string} evt.t - Type.
 * @param {number} evt.v - Version.
 */
Service.prototype.send = function (evt, cb) {
  // sampling based on tid+cid (same client always sampled in/out,
  // even if he sends multiple hits or reloads the page)
  if (
    this.sampleRate !== 100 &&
    hash.range(this.cid + this.tid, 100) + 1 > this.sampleRate
  ) {
    return;
  }

  evt.tid = this.tid;
  evt.cid = this.cid;

  var body = querystring.encode(evt);

	var headers = {
  	'Content-Type': 'application/x-www-form-urlencoded'
  };

	// Promote select HTTP headers from the client request
  // to get IP, language, and device analytics.
	// TODO are those set by browsers automatically?
  /*
  if (req) {
		['user-agent', 'x-forwarded-for', 'accept-language'].forEach(function (h) {
			if (req.headers[h] !== undefined) {
				headers[h] = req.headers[h];
			}
		});
  }
	*/

  var req = new XMLHttpRequest();

  req.open('POST', this.uri, true);

  Object.keys(headers).forEach(function (key) {
    req.setRequestHeader(key, headers[key]);
  });

  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {
      if (cb) cb(null, req.responseText);
    }

    //cb('readyState ' + req.readyState + ' status ' + req.status);
  };

  req.onerror = function (evt) {
    console.error('req error', evt);
  };

  req.send(body);
};

/**
 * Send a pageview.
 *
 * @param {string} hostname - F.ex.: example.com
 * @param {string} page - F.ex.: /home
 */
Service.prototype.pageview = function (options, cb) {
	if (!options.hostname) throw new Error('options.hostname missing');
	if (!options.page) throw new Error('options.page missing');

	var evt = {
		v: 1,
		t: 'pageview',
		dh: options.hostname,
		dp: options.page,
	};

	this.send(evt, cb);
};

/**
 * Send an event.
 *
 * @param {string} category
 * @param {string} action
 * @param {string} label
 * @param {number} value
 */
Service.prototype.event = function (options, cb) {
	if (!options.category) throw new Error('options.category missing');
	if (!options.action) throw new Error('options.action missing');

	var evt = {
		v: 1,
		t: 'event',
		ec: options.category,
		ea: options.action,
		el: options.label,
		ev: options.value || 1,
	};

	this.send(evt, cb);
};

module.exports = Service;
