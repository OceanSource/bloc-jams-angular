(function() {
    function CollectionCtrl(Fixtures) {
		
		this.albums = [];
			for (var i=0; i < 2; i++) {
				this.albums.push();
			}
    }
 
     angular
         .module('blocJams')
         .controller('CollectionCtrl', CollectionCtrl);
 })();