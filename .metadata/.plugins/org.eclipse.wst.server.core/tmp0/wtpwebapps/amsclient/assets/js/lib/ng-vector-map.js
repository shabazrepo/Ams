angular.module('vectorMap', ['ngMap']).directive('vectorMap', function() {
	'use strict';
	return {
		restrict: 'AE',
		scope: {
			mapName: '@',
			series: '=?',
			markers: '=?',
			labels: '=?',
			options: '=?'
		},
		link: function(scope, element) {
			var renderMap = function() {
				var mapConfig = angular.extend(scope.options || {}, {
					series: scope.series || {},
					markers: scope.markers || {},
					labels: scope.labels || {},
					map: scope.mapName
				});

				$(element).empty().vectorMap(mapConfig);
			};

			scope.$watch('series', renderMap);
			scope.$watch('markers', renderMap);
			scope.$watch('labels', renderMap);
			scope.$watch('options', renderMap);
		}
	};
});
