function getSparklineDirective(chartType) {
	'use strict';

	return {
		restrict: 'AE',
		scope: {
			data: "=",
			options: "="
		},
		link: function(scope, element) {
			var $el = $(element);
			var options = angular.extend(scope.options || {}, {
				type: chartType
			});

			if(typeof scope.data === 'string') {
				scope.data = JSON.parse(scope.data);
			}

			$el.text(scope.data.join(','));
			$el.sparkline(scope.data, options);

			scope.$watchCollection('data', function(newData, oldData) {
				if(oldData == newData) {
					return;
				}
				if(typeof newData === 'string') {
					newData = JSON.parse(newData);
				}
				$el.sparkline(scope.data, options);
			});
		}
	};
}

angular.module('ng-sparkline', [])
	.directive('sparklineLineChart', getSparklineDirective.bind(this, 'line'))
	.directive('sparklineBarChart', getSparklineDirective.bind(this, 'bar'))
	.directive('sparklineTristateChart', getSparklineDirective.bind(this, 'tristate'))
	.directive('sparklineDiscreteChart', getSparklineDirective.bind(this, 'discrete'))
	.directive('sparklineBulletChart', getSparklineDirective.bind(this, 'bullet'))
	.directive('sparklinePieChart', getSparklineDirective.bind(this, 'pie'))
	.directive('sparklineBoxChart', getSparklineDirective.bind(this, 'box'));
