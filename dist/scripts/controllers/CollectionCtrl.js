(function() {
    function CollectionCtrl(Fixtures) {
		this.albums = [];
			for (var i=0; i < 2; i++) {
				this.album = Fixtures.getAlbum();
				this.albums.push(this.album);
			}
    }
 
     angular
         .module('blocJams')
         .controller('CollectionCtrl',[ 'Fixtures', CollectionCtrl ] );
 })();