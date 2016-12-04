 (function() {
     function MetricCtrl($scope, $rootScope, SongPlayer, Metrics) {
		/* Chart options */
// If view changes, stop song from continuing to play
      if( $rootScope.playing === true){
        SongPlayer.stop();
      }

      $scope.title = "Current Session Metrics";
      $scope.subTitle = "Refreshing the browser page will reset the data.";

      var albums = $rootScope.metricsObj.albums;

      // Albums Metric Display
      $scope.albumOptions = {
        chart: {
          type: 'pieChart',
          height: 500,
          x: function(d){return d.name;},
          y: function(d){return d.count;},
          showLabels: true,
          duration: 500,
          labelThreshold: 0.01,
          labelSunbeamLayout: false,
          legend: {
            margin: {
              top: 5,
              right: 35,
              bottom: 5,
              left: 0
            }
          }
        }
      };

      // Pass album data only if they've been selected
      for(var a = 0; a < albums.length; a++){
        if(albums[a].count !== 0){
          $scope.albumData = $rootScope.metricsObj.albums;
        } else {
          $scope.albumData = [];
        }
      }

      // $scope.albumData = $rootScope.metricsObj.albums;

      // Songs Metric Display
      $scope.songsOptions = {
        chart: {
          type: 'multiBarHorizontalChart',
          height: 500,
          x: function(d){return d.name;},
          y: function(d){return d.count;},
          showControls: false,
          showValues: true,
          duration: 500,
          xAxis: {
              showMaxMin: false
          },
          yAxis: {
              axisLabel: 'Plays',
          }
        }
      };

      var songValues = [];

      // Loop through albums
      for(var i = 0; i < albums.length; i++){
        // Loop through songs in each album
        for(var j = 0; j < albums[i].songs.length; j++){

          // Only add songs that have been played
          if(albums[i].songs[j].count !== 0){
            songValues.push( albums[i].songs[j] );
          }

        }
      }

      // Sort songs by play count (highest to lowest)
      songValues.sort(function (a, b) {
        if (a.count > b.count) { return -1; }
        if (a.count < b.count) { return 1; }
        return 0;
      });

      $scope.songsData = [
        {
          "key": "Song Plays",
          "color": "#7986CB",
          "values": songValues
        }
      ];
	 }
     angular
 .module('blocJams')
 .controller('MetricCtrl', ['$scope', '$rootScope', 'SongPlayer', 'Metrics', MetricCtrl]);
 })();
 