(function() {
  function Metrics($rootScope, Fixtures){

  
// Setup our metrics fixture
      $rootScope.metricsObj = {
        "albums": [
          {
            "artist": "Pablo Picasso",
            "name": "The Colors",
            "count": 0,
            "songs": [
              { "name": "Blue", "count": 0 },
              { "name": "Green", "count": 0 },
              { "name": "Red", "count": 0 },
              { "name": "Pink", "count": 0 },
              { "name": "Magenta", "count": 0 }
            ]
          },
          {
            "artist": "Broke For Free",
            "name": "Directionless EP",
            "count": 0,
            "songs": [
              { "name": "Night Owl", "count": 0 },
              { "name": "My Always Mood", "count": 0 },
              { "name": "Day Bird", "count": 0 },
              { "name": "My Luck", "count": 0 },
              { "name": "Mell's Parade", "count": 0 },
              { "name": "Only Instrumental", "count": 0 }
            ]
          },
          {
            "name": "Mystery Club",
            "artist": "Waylon Thornton",
            "label": "White Moon Recordings",
            "count": 0,
            "songs": [
              { "name": "Bronco Romp", "count": 0 },
              { "name": "Favorite Secrets", "count": 0 },
              { "name": "Flashlight Tag", "count": 0 },
              { "name": "Look For Danger", "count": 0 },
              { "name": "Piece Of Eight", "count": 0 },
              { "name": "Very Hazel", "count": 0 },
              { "name": "Wobbly Way", "count": 0 }
            ]
          }
        ],
        "history": []
      };

      var metricsObj = $rootScope.metricsObj.albums;

      return {

        // Count the number of times an album is selected
        albumCount: function(songNum){
          metricsObj[songNum].count += 1;
        },

        // Count the number of times a song is played
        songCount: function(songNum, albumNum){
          // Increment song count
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
        .factory('Metrics', ['$rootScope', 'Fixtures', Metrics]);
})();