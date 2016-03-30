// when running in browser, this module replaces
// the nodejs wrapper of xmlhttprequest

exports.XMLHttpRequest = (function () {
	if (typeof window === 'undefined') {
		throw new Error('no window object present');
	} else if (window.XMLHttpRequest) {
		return window.XMLHttpRequest;
	} else if (window.ActiveXObject) {
		var axs = [
			'Msxml2.XMLHTTP.6.0',
			'Msxml2.XMLHTTP.3.0',
			'Microsoft.XMLHTTP'
		];

		for (var i = 0; i < axs.length; i++) {
			try {
			  var ax = new(window.ActiveXObject)(axs[i]);
			  return function () {
			      if (ax) {
			          var ax_ = ax;
			          ax = null;
			          return ax_;
			      }
			      else {
			          return new(window.ActiveXObject)(axs[i]);
			      }
			  };
			}
			catch (e) {}
		}

		throw new Error('ajax not supported in this browser')
	} else {
    throw new Error('ajax not supported in this browser');
	}
})();
