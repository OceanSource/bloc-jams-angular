(function() {
    function SongPlayer($rootScope, Fixtures) {
		
		// Private
		
		/**
		* @desc SongPlayer object
		* @type {Object}
		**/
        var SongPlayer = {};

		/**
		* @desc object with the album information
		* @type {Object}
		**/		
		var currentAlbum = Fixtures.getAlbum();
		
		/**
		* @function getSongIndex
		* @desc returns index number of song
		* @param {Object} song
		*/		
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);
		};	
		
		/**
		* @desc Buzz object audio file
		* @type {Object}
		**/
		var currentBuzzObject = null;
		
		/**
		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		var setSong = function(song) {
			if (currentBuzzObject) {
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			}
 
 			/**
			* @desc create new buzz.sound object
			* @type {Object}
			*/
			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

 			/**
			* @desc binds buzz.sound object current time
			* @type {Object}
			*/			
			currentBuzzObject.bind('timeupdate', function() {
				$rootScope.$apply(function() {
					SongPlayer.currentTime = currentBuzzObject.getTime();
				});
			});
			
			/**
			* @desc binds buzz.sound object current volume
			* @type {Object}
			*/			
			currentBuzzObject.bind('volumeupdate', function() {
				$rootScope.$apply(function() {
					SongPlayer.currentVolume = currentBuzzObject.volume();
				});
			});				
 
			/**
			* @desc Currently playing song
			* @type {Number}
			*/
			SongPlayer.currentSong = song;
			
			/**
			* @desc Current playback time (in seconds) of currently playing song
			* @type {Number}
			*/
			SongPlayer.currentTime = null;
			
			/**
			* @desc volume
			* @type {Number}
			*/
			SongPlayer.currentVolume = null;
		};
		
		/**
		* @function playSong
		* @desc Plays currentBuzzObject song and sets song.playing bool to true
		* @param {Object} song		
		*/		
		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;
		};

		/**
		* @function stopSong
		* @desc Stops currentBuzzObject song and sets song.playing null
		* @param {Object} song		
		*/		
		var stopSong = function(song) {
			currentBuzzObject.stop();
			SongPlayer.currentSong.playing = null;
		};
		
		// Public
		
		/**
		* @desc album object 
		* @type {Object}
		**/
		SongPlayer.currentSong = null;

		/**
		* @function SongPlayer.play
		* @desc Logic to control playing of song. New selected song or paused song set to play
		* @param {Object} song
		*/
		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
		    if (SongPlayer.currentSong !== song) {
				setSong(song);				
				playSong(song);
				
				
			}else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong(song);
					
				}
			}
		};

		/**
		* @function SongPlayer.pause
		* @desc Pauses currentBuzzObject song and sets bool of song.playing to false
		* @param {Object} song
		* @returns {Object}
		*/		
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};

		/**
		* @function SongPlayer.previous
		* @desc Move index to previous song
		*/			
		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;
			
			if (currentSongIndex < 0) {
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}			
		};	
		
		/**
		* @function SongPlayer.next
		* @desc Move index to next song
		*/			
		SongPlayer.next = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;
			if (currentSongIndex >= currentAlbum.songs.length) {
				stopSong(song);
				
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}			
		};
		
		/**
		* @function setCurrentTime
		* @desc Set current time (in seconds) of currently playing song
		* @param {Number} time
		*/
		SongPlayer.setCurrentTime = function(time) {
			if (currentBuzzObject) {
				currentBuzzObject.setTime(time);
			}
		};
		/**
		* @function setCurrentVolume
		* @desc Set current volume
		* @param {Number} time
		*/
		SongPlayer.setCurrentVolume = function(volume) {
			if (currentBuzzObject) {
				currentBuzzObject.setVolume(volume);
			}
		};
		
        return SongPlayer;
    }

    angular
		.module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();