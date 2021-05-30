import superagent from 'superagent';
import querystring from 'querystring';
import hash from './hash.js';

/**
 *
 *
 * @param {string} options.uris - URIs to send post events to.
 * @param {number} options.sampleRate - From 0 to 100, defaults to 100.
 * @param {boolean} options.anonymizeIp - From 0 to 100, defaults to 100.
 */
function Service(options) {
  this.options = options;
  if (!options.tid) throw new Error('options.tid missing');
  if (!options.cid) throw new Error('options.cid missing');

  this.tid = options.tid;
  this.cid = options.cid || 'N/A';
  this.uri = options.uri || 'https://www.google-analytics.com/collect';
  this.sampleRate = options.sampleRate || 100;
  this.anonymizeIp = options.anonymizeIp !== false;

  // sampling based on tid+cid (same client always sampled in/out,
  // even if he sends multiple hits or reloads the page)
  this.sampledOut =
    this.sampleRate !== 100 &&
    hash.range(this.cid + this.tid, 100) + 1 > this.sampleRate;
}

/**
 * Send a hit.
 *
 * @param {string} evt.t - Type.
 * @param {number} evt.v - Version.
 */
Service.prototype.send = function (evt, cb) {
  if (this.sampledOut) {
    return;
  }

  evt.tid = this.tid;
  evt.cid = this.cid;

  evt = {
    ...evt,
    aip: this.anonymizeIp ? 1 : 0,
  };

  var body = querystring.encode(evt);

  superagent
    .post(this.uri)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send(body)
    .then((res) => cb(null, res.body))
    .catch((err) => cb(err));
};

/**
 * Send a pageview.
 *
 * @param {string} hostname - F.ex.: example.com
 * @param {string} page - F.ex.: /home
 * @param {string} title - F.ex.: Home
 */
Service.prototype.pageview = function (options, cb) {
  if (!options.hostname) throw new Error('options.hostname missing');
  if (!options.page) throw new Error('options.page missing');

  var evt = {
    v: 1,
    t: 'pageview',
    dh: options.hostname,
    dp: options.page,
    dt: options.title,
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

export default Service;
