function getPeityDirective(chartType) {
	'use strict';

	return {
		restrict: 'AE',
		scope: {
			data: "=",
			options: "="
		},
		link: function(scope, element) {
			var $el = $(element);

			if(typeof scope.data === 'string') {
				scope.data = JSON.parse(scope.data);
			}

			$el.text(scope.data.join(','));
			$el.peity(chartType, scope.options);

			scope.$watchCollection('data', function(newData, oldData) {
				if(oldData == newData) {
					return;
				}
				if(typeof newData === 'string') {
					newData = JSON.parse(newData);
				}

				$el.text(newData.join(','));
				$el.change();
			});
		}
	};
}

angular.module('ng-peity', [])
	.directive('peityPieChart', getPeityDirective.bind(this, 'pie'))
	.directive('peityDonutChart', getPeityDirective.bind(this, 'donut'))
	.directive('peityBarChart', getPeityDirective.bind(this, 'bar'))
	.directive('peityLineChart', getPeityDirective.bind(this, 'line'))
	.run(function() {
		'use strict';

		$.fn.peity.defaults.pie = {
			delimiter: null,
			fill: ["#40babd", "#f5f5f5", "#92d1d2"],
			height: null,
			radius: 16,
			width: null
		};

		$.fn.peity.defaults.donut = {
			delimiter: null,
			fill: ["#40babd", "#f5f5f5", "#92d1d2"],
			height: null,
			innerRadius: null,
			radius: 16,
			width: null
		};

		$.fn.peity.defaults.line = {
			delimiter: ",",
			fill: "#92d1d2",
			height: 32,
			max: null,
			min: 0,
			stroke: "#40babd",
			strokeWidth: 1,
			width: 64
		};

		$.fn.peity.defaults.bar = {
			delimiter: ",",
			fill: ["#40babd"],
			height: 32,
			max: null,
			min: 0,
			padding: 0.1,
			width: 64
		};
	});
