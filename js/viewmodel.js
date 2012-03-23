(function () {

	function SongViewModel (model) {
		this.title = model.title;
		this.mp3 = model.mp3;
		this.ogg = model.ogg;
	}

	function CatalogViewModel (catalog) {
		this.songs = [];
		for (var i = 0; i < catalog.songs.length; i++) {
			this.songs.push(
				new SongViewModel( catalog.songs[i] ) );
		}
	}

	window.addEventListener('load', function () {

		ko.applyBindings(new CatalogViewModel(CATALOG));

	});

})();
