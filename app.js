window.onload = function wub() {

	var loading = {
		start: function(location) {
			location.innerHTML = '';
			var loader = document.createElement('img');
			loader.src = '/img/loading.gif';
			location.appendChild(loader);
		},
		stop: function(location) {
			location.innerHTML = '';
		}
	}

	var updateContent = function(s, cb) {
		loading.start(document.querySelector('.content'));
		http.GET('http://kwub.herokuapp.com/s/' + s, function(data) {
			var content = JSON.parse(data);
			var contentKey = Object.keys(content)[0];
			cb(content[contentKey]);
		});
	}

	var refreshDiv = function(div, c) {
		div.innerHTML = '';
		div.appendChild((function() {
				var dom = new DOMParser();
				return dom.parseFromString(c, 'text/html').body;
			})());
	}

	document.querySelector('.search')
		.addEventListener('click', function(e) {
			var key = document.querySelector('.key').value;
			updateContent(key, function(content) {
				loading.stop(document.querySelector('.content'));
				refreshDiv(document.querySelector('.content'), content);
			});
		});
};
