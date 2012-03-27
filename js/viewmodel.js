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

	var findSongById = function (id) {
		for (var i = 0; i < catalogViewModel.songs.length; i++) {
			if (catalogViewModel.songs[i].id === id) {
				return catalogViewModel.songs[i];
			}
		}
		return null;
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

	var progressClickHandler = function (viewModel, event) {
		if (viewModel === currentSong) {
			var div = $(event.currentTarget);
			var width = $(div).width();
			var percent = event.offsetX * 100 / width;
			PLAYER.scrub(viewModel.id, percent);
		}
	};

	function SongViewModel (model) {
		this.id = model.id;
		this.title = model.title;
		this.mp3 = makePath(model, 'mp3');
		this.ogg = makePath(model, 'ogg');
		this.buttonImage = ko.observable(playImage);
		this.buttonClick = buttonClickHandler;
		this.percentComplete = ko.observable('0%');
		this.progressClick = progressClickHandler;
		this.mp3Class = PLAYER.isMP3Supported() ? 
			'linkVisible' : 'linkInvisible';
		this.oggClass = PLAYER.isOGGSupported() ? 
			'linkVisible' : 'linkInvisible'; 
	}

	function CatalogViewModel (catalog) {
		this.songs = [];

		for (var i = 0; i < catalog.songs.length; i++) {
			this.songs.push(
				new SongViewModel( catalog.songs[i] ) );
			PLAYER.addTrack(catalog.songs[i]);
		}

		this.playerClass = PLAYER.isSupported() ? 
			'playerVisible' : 'playerInvisible';
		this.notSupportedClass = PLAYER.isSupported() ? 
			'notSupportedInvisible' : 'notSupportedInvisible';
	}

	window.addEventListener('load', function () {

		catalogViewModel = new CatalogViewModel(CATALOG);
		ko.applyBindings(catalogViewModel);

		PLAYER.trackEnded( function (id) {
			currentSong.buttonImage(playImage);
			currentSong.percentComplete('0%');
			currentSong = null;
		});

		PLAYER.trackAdvanced( function (nextTrack) {
			var song = findSongById(nextTrack.id);
			currentSong = song;
			currentSong.buttonImage(pauseImage);				
		});

		$('#continuous').click( function () {
			PLAYER.continuous = $('#continuous').attr('checked') != undefined;
			console.log(PLAYER.continuous);
		});

		$('#continuous').attr('checked', 'true');
	});

	var updatePercentComplete = function () {
		if (currentSong != null) {
			currentSong.percentComplete(
				PLAYER.getPercentComplete(currentSong.id));
		}

		setTimeout(updatePercentComplete, 100);
	};

	setTimeout(updatePercentComplete, 100);

})();
