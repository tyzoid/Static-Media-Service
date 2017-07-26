function getJson(url, callback) {
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.responseType = "json";

	request.onload = function() {
		//var json = JSON.decode(request.response);
		var json = request.response;
		callback(json);
	};

	request.send();
}

if (!Array.prototype.includes) {
	Array.prototype.includes = function(value, index) {
		if (typeof index !== 'number' || index < 0) {
			index = 0;
		}

		for (var i = index; i < this.length; i++) {
			if (this[i] === value) {
				return true;
			}
		}

		return false;
	};
}
