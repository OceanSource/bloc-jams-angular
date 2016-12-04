(function() {
  function Metrics($rootScope) {
    $rootScope.songPlays = [];
    return {
      // Function that records a metric object by pushing it to the $rootScope array
      registerSongPlay: function(songObj) {
        // Add time to event register
		
		console.log("Fired registerSongPlay");
        songObj['playedAt'] = new Date();
		//songObj['playedAtFormatted'] = moment(songObj['playedAt'],'MM/DD/YYYY').add(1,day);
        $rootScope.songPlays.push(songObj);
      },
      listSongsPlayed: function() {
        var songs = []; 
        angular.forEach($rootScope.songPlays, function(song) {
            songs.push(song.title);
        });
        return songs;
      }
    };
  }

  angular
    .module('blocJams')
    .service('Metrics', ['$rootScope',Metrics]);
})();