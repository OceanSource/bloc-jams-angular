(function() {
    function volumeBar($document) {

		/**
		* @function calculatePercent
		* @desc Finds offset on volumebar  
		* @param volumeBar, event
		* @returns {Number} offsetXPercent
		*/		
		var calculatePercent = function(volumeBar, event) {
			var offsetX = event.pageX - volumeBar.offset().left;
			var volumeBarWidth = volumeBar.width();
			var offsetXPercent = offsetX / volumeBarWidth;
			offsetXPercent = Math.max(0, offsetXPercent);
			offsetXPercent = Math.min(1, offsetXPercent);
		return offsetXPercent;
		};
		
		return {
			templateUrl: '/templates/directives/volume_bar.html',
			replace: true,
			restrict: 'E',
			scope: {
				onChange: '&'
			},
			link: function(scope, element, attributes) {
				scope.value = 0;
				scope.max = 100;
						
				/**
				* @desc volumeBar element object
				* @type {Object}
				**/
				var volumeBar = $(element);

				attributes.$observe('value', function(newValue) {
					scope.value = newValue;
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
				* @function onClickVolumeBar
				* @desc creates scope.value of position on volume bar
				* @param event
				*/				
				scope.onClickVolumeBar = function(event) {
					var percent = calculatePercent(volumeBar, event);
					scope.value = percent * scope.max;
					notifyOnChange(scope.value);
				};
				
				/**
				* @function trackThumb
				* @desc tracks thumb movement and updates position on volume bar
				*/
				scope.trackThumb = function() {
					$document.bind('mousemove.thumb', function(event) {
						var percent = calculatePercent(volumeBar, event);
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
        .directive('volumeBar', ['$document', volumeBar]);
})();