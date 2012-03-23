var PLAYER = (function () {

	var player = {};
	var tracks = [];
	var currentTrack;

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

	player.add = function (song) {
		var newTrack = Object.create(track);
		newTrack.id = song.id;
		newTrack.sound = new buzz.sound(
			song.basePath,
			{ formats: song.formats });
		tracks.push(newTrack);
	};	

	player.togglePlay = function (id) {	
		var track = findTrack(id);
		if (track === currentTrack) {
			track.sound.togglePlay();
		}

		currentTrack.sound.stop();
		currentTrack = track;
		currentTrack.togglePlay();
	};

	return player;

})();
