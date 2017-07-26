(function() {
	function viewPage(md) {
		var content = md.content;
		var media = {};
		var mediaTypes = ['tv', 'movie'];

		for (var i = 0; i < content.length; i++) {
			var contentType = content[i].type;
			if (!mediaTypes.includes(contentType)) continue;

			if (!media[contentType]) {
				var nmed = document.createElement('div');
				nmed.id = contentType;

				media[contentType] = nmed;
			}

			var ncard = document.createElement('a');
			if (md.displayMode === 'cards') {
				ncard.className = 'card';
			} else if (md.displayMode === 'list') {
				ncard.className = 'list-el';
			}

			if (content[i].mediaType === 'file') {
				ncard.href = content[i].media;
			} else if (content[i].mediaType === 'list') {
				(function(elem, pval) {
					elem.addEventListener('click', function() {
						history.pushState({page: pval}, '', pval.split('.')[0]);
						getPage(pval);
					});
				})(ncard, content[i].media);
			}

			var cimg = document.createElement('img');
			cimg.src = content[i].thumb;

			var ctit = document.createElement('span');
			ctit.className = 'card-title';
			ctit.innerText = content[i].title;
			
			ncard.appendChild(cimg);
			ncard.appendChild(ctit);

			media[contentType].appendChild(ncard);
		}

		var cards = document.getElementById('cards');

		// clear current children
		while (cards.firstChild) {
			cards.removeChild(cards.firstChild);
		}

		// add new children
		for (var i = 0; i < mediaTypes.length; i++) {
			if (!media[mediaTypes[i]]) continue;

			cards.appendChild(media[mediaTypes[i]]);
		}
	}

	var mediaData = false;
	var init = false;

	function getPage(page) {
		getJson(page, function(json){
			mediaData = json;
			if (init !== false) {
				viewPage(mediaData);
			}
		});
	}

	document.addEventListener("DOMContentLoaded", function() { 
		init = true;
		if (mediaData !== false) {
			viewPage(mediaData);
		}
	});

	window.addEventListener('popstate', function(e) {
		if (!e.state) getPage('/content.json');
		else getPage(e.state.page);
	});

	getPage("/content.json");
})();
