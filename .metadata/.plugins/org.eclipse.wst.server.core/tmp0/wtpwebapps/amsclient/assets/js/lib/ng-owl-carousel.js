angular.module('owlCarousel', []).directive('owlCarousel', function() {
	'use strict';

	return {
		restrict: "EA",
		scope: {
			'items': "@",
			'itemsCustom': "@",
			'itemsDesktop': "@",
			'itemsDesktopSmall': "@",
			'itemsTablet': "@",
			'itemsTabletSmall': "@",
			'itemsMobile': "@",
			'singleItem': "@",
			'itemsScaleUp': "@",
		    'autoPlay' : '@',
		    'stopOnHover' : '@',
    		'slideSpeed' : '@',
    		'paginationSpeed' : '@',
    		'rewindSpeed' : '@',
    		'pagination': '@',
    		'responsive': '@',
    		'paginationNumbers': '@',
			'options': '='
		},
		controller: function($scope, $element) {
			this.initCarousel = function() {
				var options = angular.extend({}, {
					'items': $scope.items,
					'itemsCustom': $scope.itemsCustom && JSON.parse($scope.itemsCustom),
					'itemsDesktop': $scope.itemsDesktop && JSON.parse($scope.itemsDesktop),
					'itemsDesktopSmall': $scope.itemsDesktopSmall && JSON.parse($scope.itemsDesktopSmall),
					'itemsTablet': $scope.itemsTablet && JSON.parse($scope.itemsTablet),
					'itemsTabletSmall': $scope.itemsTabletSmall && JSON.parse($scope.itemsTabletSmall),
					'itemsMobile': $scope.itemsMobile && JSON.parse($scope.itemsMobile),
					'singleItem': $scope.singleItem,
					'itemsScaleUp': $scope.itemsScaleUp,
					'autoPlay' : $scope.autoPlay,
					'stopOnHover' : $scope.stopOnHover,
					'slideSpeed' : $scope.slideSpeed,
					'paginationSpeed' : $scope.paginationSpeed,
					'rewindSpeed' : $scope.rewindSpeed,
					'pagination': $scope.pagination,
					'responsive': $scope.responsive,
					'paginationNumbers': $scope.paginationNumbers
				}, $scope.options);
				$($element).owlCarousel(options);
			};
		}
	};
}).directive('owlCarouselItem', function() {
	'use strict';

	return {
		restrict: "EA",
		require: "^^owlCarousel",
		scope: false,
		link: function(scope, element, attrs, owlCarousel) {
			if(scope.$last) {
				owlCarousel.initCarousel();
			}
		}
	};
});
