angular.module('matchHeight', []).directive('matchHeight', function() {
	'use strict';
	var groups = {};

	return {
		restrict: 'A',
		link: function(scope, element, attr) {
			var identifier = attr['match-height'];

			if(!groups[identifier]) {
				groups[identifier] = [];
			}
			groups[identifier].push(element);
			$(groups[identifier]).matchHeight();
		}
	};
});
