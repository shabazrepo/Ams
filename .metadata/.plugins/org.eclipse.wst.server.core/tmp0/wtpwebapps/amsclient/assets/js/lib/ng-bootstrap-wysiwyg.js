angular.module('bootstrapWysiwyg', []).directive('bootstrapWysiwyg', function() {
	'use strict';

	return {
		restrict: 'AE',
		scope: {
			'toolbar': '=',
			'useLineBreaks': '=',
			'parserRules': '=',
			'locale': '=',
			'shortcuts': '='
		},
		link: function(scope, element) {
			if(typeof scope.toolbar === 'string') {
				scope.toolbar = JSON.parse(scope.toolbar);
			}
			if(typeof scope.parserRules === 'string') {
				scope.toolbar = JSON.parse(scope.toolbar);
			}
			if(typeof scope.shortcuts === 'string') {
				scope.toolbar = JSON.parse(scope.toolbar);
			}

			$.fn.wysihtml5.defaultOptions = {
				'toolbar': {
            		'fa': true
            	}
    		};

			$(element).wysihtml5(scope);
		}
	};
});
