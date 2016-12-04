(function() {
  function Metrics($rootScope, Fixtures){

  
	  	var albumPicasso = {
			title: 'The Colors',
			artist: 'Pablo Picasso',
			label: 'Cubism',
			year: '1881',
			albumArtUrl: '/assets/images/album_covers/01.png',
			songs: [
				{ title: 'Blue', duration: '161.71', audioUrl: '/assets/music/blue' },
				{ title: 'Green', duration: '103.96', audioUrl: '/assets/music/green' },
				{ title: 'Red', duration: '268.45', audioUrl: '/assets/music/red' },
				{ title: 'Pink', duration: '153.14', audioUrl: '/assets/music/pink' },
				{ title: 'Magenta', duration: '374.22', audioUrl: '/assets/music/magenta' }
			]
		};

      var metricsObj = $rootScope.metricsObj = { 
	       
		   albums:   Fixtures.getAlbum();
	  metricsObj.album = {};
	  metricsObj.album = Fixtures.getAlbum();
	  metricsObj.album.history = [];
	  metricsObj.album.titleCount = 0;
	  console.log(album);
	  

      return {

        // Count the number of times an album is selected
        albumCount: function(albumTitle){
          metricsObj[albumTitle].count += 1;
        },

        // Count the number of times a song is played
        songCount: function(songNum, albumNum){
          // Increment song count
		  console.log(songNum);
		   
          metricsObj[albumNum].songs[songNum].count += 1;

          // Add to the song history log
          var dateTime = new Date();

          var result = {
            date: dateTime,
            album: metricsObj[albumNum].name,
            song: metricsObj[albumNum].songs[songNum].name,
            artist: metricsObj[albumNum].artist
          };

          $rootScope.metricsObj.history.push(result);
        }

      };

    }


  angular
    .module('blocJams')
    .service('Metrics', ['$rootScope','Fixtures', Metrics]);
})();