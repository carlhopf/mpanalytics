import config from './config.js';
import hash from '../lib/hash.js';
import { v4 } from 'uuid';
import assert from 'assert';

describe('hash', function () {
	it('get uuid', function () {
		var res = hash.get(v4());
		assert.equal(typeof res, 'number');
	});

	it('range uuid', function () {
		var len = 100;
		var i;
		var map = {};

		for (i = 0; i < len; i++) {
			map[i] = 0;
		}

		for (i = 0; i < 100000; i++) {
			map[hash.range(v4(), len)]++;
		}

		console.log(map);

		for (i = 0; i < len; i++) {
			assert.notEqual(map[i], 0);
		}
	});
});
