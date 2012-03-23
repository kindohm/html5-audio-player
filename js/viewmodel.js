(function () {

	var playImage = 'images/play.png';
	var pauseImage = 'images/pause.png';
	var catalogViewModel;
	var currentSong;

	var makePath = function (songModel, format) {
		var index = songModel.formats.indexOf(format);
		if (index < 0) {
			return null;
		}
		return songModel.basePath + '.' + 
			songModel.formats[index];
	};

	var buttonClickHandler = function (viewModel) {

		if (currentSong != viewModel) {
			if (currentSong != null) {
				currentSong.buttonImage(playImage);
				currentSong.percentComplete('0%');
			}
			currentSong = viewModel;
		}

		PLAYER.togglePlay(viewModel.id);	
		viewModel.buttonImage(
			viewModel.buttonImage() === playImage ?
				pauseImage : playImage);
	};

	function SongViewModel (model) {
		this.id = model.id;
		this.title = model.title;
		this.mp3 = makePath(model, 'mp3');
		this.ogg = makePath(model, 'ogg');
		this.buttonImage = ko.observable(playImage);
		this.buttonClick = buttonClickHandler;
		this.percentComplete = ko.observable('0%');
	}

	function CatalogViewModel (catalog) {
		this.songs = [];
		for (var i = 0; i < catalog.songs.length; i++) {
			this.songs.push(
				new SongViewModel( catalog.songs[i] ) );
			PLAYER.addTrack(catalog.songs[i]);
		}
	}

	window.addEventListener('load', function () {

		catalogViewModel = new CatalogViewModel(CATALOG);
		ko.applyBindings(catalogViewModel);

	});

	var updatePercentComplete = function () {
		if (currentSong != null) {
			currentSong.percentComplete(PLAYER.getPercentComplete(currentSong.id));
		}

		setTimeout(updatePercentComplete, 100);
	};

	setTimeout(updatePercentComplete, 100);

})();
