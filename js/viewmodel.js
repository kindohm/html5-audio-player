(function () {

	var playImage = 'images/play.png';
	var pauseImage = 'images/pause.png';

	var makePath = function (songModel, format) {
		var index = songModel.formats.indexOf(format);
		if (index < 0) {
			return null;
		}
		return songModel.basePath + '.' + 
			songModel.formats[index];
	};

	function SongViewModel (model) {
		this.id = model.id;
		this.title = model.title;
		this.mp3 = makePath(model, 'mp3');
		this.ogg = makePath(model, 'ogg');
		this.buttonImage = ko.observable(playImage);
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
