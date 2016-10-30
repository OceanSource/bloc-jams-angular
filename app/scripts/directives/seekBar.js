(function() {
    function seekBar($document) {

		/**
		* @function calculatePercent
		* @desc Finds offset on seekbar  
		* @param seekBar, event
		* @returns {Number} offsetXPercent
		*/		
		var calculatePercent = function(seekBar, event) {
			var offsetX = event.pageX - seekBar.offset().left;
			var seekBarWidth = seekBar.width();
			var offsetXPercent = offsetX / seekBarWidth;
			offsetXPercent = Math.max(0, offsetXPercent);
			offsetXPercent = Math.min(1, offsetXPercent);
		return offsetXPercent;
		};
		
		return {
			templateUrl: '/templates/directives/seek_bar.html',
			replace: true,
			restrict: 'E',
			scope: {
				onChange: '&'
			},
			link: function(scope, element, attributes) {
				scope.value = 0;
				scope.max = 100;
						
				/**
				* @desc seekBar element object
				* @type {Object}
				**/
				var seekBar = $(element);

				attributes.$observe('value', function(newValue) {
					scope.value = newValue;
				});
				
				attributes.$observe('max', function(newValue) {
					scope.max = newValue;
				});				

				/**
				* @function percentString
				* @desc divides scope.value by scope.max returns number as percent 
				* @returns {Number} percent
				*/				
				var percentString = function () {
					var value = scope.value;
					var max = scope.max;
					var percent = value / max * 100;
					return percent + "%";
				};

				/**
				* @function scope.fillStyle
				* @desc returns css attribute 
				* @returns {Object} descriptor and value to use in as css attribute
				*/					
				scope.fillStyle = function() {
					return {width: percentString()};
				};
				
				/**
				* @function scope.thumbStyle
				* @desc returns css attribute 
				* @returns {Object} descriptor and value to use in as css attribute
				*/					
				scope.thumbStyle = function() {
					return {left: percentString()};
				};
				
				/**
				* @function onClickSeekBar
				* @desc creates scope.value of position on seek bar
				* @param event
				*/				
				scope.onClickSeekBar = function(event) {
					var percent = calculatePercent(seekBar, event);
					scope.value = percent * scope.max;
					notifyOnChange(scope.value);
				};
				
				/**
				* @function trackThumb
				* @desc tracks thumb movement and updates position on seek bar
				*/
				scope.trackThumb = function() {
					$document.bind('mousemove.thumb', function(event) {
						var percent = calculatePercent(seekBar, event);
						scope.$apply(function() {
							scope.value = percent * scope.max;
							notifyOnChange(scope.value);
						});
					});
					var notifyOnChange = function(newValue) {
						if (typeof scope.onChange === 'function') {
							scope.onChange({value: newValue});
						}
					};
				
					$document.bind('mouseup.thumb', function() {
						$document.unbind('mousemove.thumb');
						$document.unbind('mouseup.thumb');
					});
				};				
			}
		};
    }

    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();