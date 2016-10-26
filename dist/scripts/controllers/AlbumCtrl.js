(function() {
    function AlbumCtrl() {
		this.albumDatas = albumPicasso;
	};
     angular
         .module('blocJams')
         .controller('AlbumCtrl', AlbumCtrl);
 })();