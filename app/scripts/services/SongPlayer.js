(function() {
    function SongPlayer(Fixtures) {
		
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
 
			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});
 
			SongPlayer.currentSong = song;
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
		
        return SongPlayer;
    }

    angular
		.module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();