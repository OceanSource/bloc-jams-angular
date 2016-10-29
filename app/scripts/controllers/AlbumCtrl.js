(function() {
    function AlbumCtrl(Fixtures, SongPlayer) {
		this.albumDatas = Fixtures.getAlbum();
		this.songPlayer = SongPlayer;
	}
    angular
		.module('blocJams')
		.controller('AlbumCtrl',[ 'Fixtures', 'SongPlayer', AlbumCtrl]);
 })();