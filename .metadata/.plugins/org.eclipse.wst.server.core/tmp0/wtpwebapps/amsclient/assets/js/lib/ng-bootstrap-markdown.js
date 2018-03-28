angular.module('bootstrapMarkdown', []).directive('bootstrapMarkdown', function() {
	'use strict';

	return {
		restrict: 'AE',
		scope: {
			'autofocus': '=',
			'savable': '=',
			'hideable': '=',
			'width': '=',
			'height': '=',
			'resize': '=',
			'iconlibrary': '=',
			'language': '=',
			'footer': '=',
			'fullscreen': '=',
			'hiddenButtons': '=',
			'disabledButtons': '='
		},
		link: function(scope, element) {
			$(element).markdown(scope);
		}
	};
});
