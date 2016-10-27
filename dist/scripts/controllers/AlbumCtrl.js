(function() {
    function AlbumCtrl(Fixtures) {
		this.albumDatas = Fixtures.getAlbum();
	};
    angular
		.module('blocJams')
		.controller('AlbumCtrl',[ 'Fixtures', AlbumCtrl]);
 })();