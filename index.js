var Service = require('./lib/Service');

exports.create = function (options) {
	return new Service(options);
};
