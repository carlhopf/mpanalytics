import mpanalytics from '../index.js';
import config from './config.js';

const tracker = mpanalytics.create({
  tid: config.UA,
  cid: Math.random() + 'browser',
});

tracker.pageview(
  {
    hostname: 'example.com',
    page: '/home',
    title: 'Home',
  },
  function (err) {
    console.log(err);
  }
);

tracker.event({
  category: 'test',
  action: 'alright',
});
