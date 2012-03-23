var PLAYER = (function () {

	var player = {};
	var tracks = [];
	var currentTrack = null;

	var track = {
		id : '',
		sound : null
	};

	var findTrack = function (id) {
		for (var i = 0; i < tracks.length; i++) {
			if (tracks[i].id === id) {
				return tracks[i];
			}
		}
		return null;
	};

	player.addTrack = function (song) {
		var newTrack = Object.create(track);
		newTrack.id = song.id;
		newTrack.sound = new buzz.sound(
			song.basePath,
			{ formats: song.formats });
		tracks.push(newTrack);
	};	

	player.togglePlay = function (id) {	
		var track = findTrack(id);

		if (currentTrack === null) {
			currentTrack = track;
		}

		if (track === currentTrack) {
			track.sound.togglePlay();
			return;
		}

		currentTrack.sound.pause();
		currentTrack.sound.setTime(0);
		currentTrack = track;
		currentTrack.sound.togglePlay();
	};

	return player;

})();
