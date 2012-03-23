var CATALOG = (function () {

	var catalog = {
		songs : [
			{ 
				'id' : 1,
				'title' : 'Brush',
				'basePath' : 'audio/song1',
				'formats' : [ 'ogg', 'mp3' ]
			},
			{
				'id' : 2,
				'title' : 'Snorkel',
				'basePath' : 'audio/song2',
				'formats' : [ 'ogg', 'mp3' ]
			},
			{
				'id' : 3,
				'title' : 'Stairs',
				'basePath' : 'audio/song3',
				'formats' : [ 'ogg', 'mp3' ]
			}
		]
	};

	return catalog;
})();
