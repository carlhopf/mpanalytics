// http://werxltd.com/wp/2010/05/13/
// javascript-implementation-of-javas-string-hashcode-method/
export function get(str) {
	var hash = 0;
	var len = str.length;

	if (len == 0) return hash;

	for (var i = 0, len = len; i < len; i++) {
		var c = str.charCodeAt(i);
		hash = ((hash << 5) - hash) + c;
		hash = hash & hash;
	}

	return hash;
};

/**
 * Calculate index for string within length based on hash.
 *
 * @returns {number} - Index within length, in range [0 -> length).
 */
export function range (str, length) {
	return Math.abs(get(str) % length);
};

export default {
	get,
	range,
}
