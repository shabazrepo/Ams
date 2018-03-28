angular.module('bootstrapSwitch', []).directive('bootstrapSwitch', function() {
	'use strict';

	return {
		restrict: 'AE',
		scope: {
			'state': '=',
			'size': '=',
			'animate': '=',
			'disabled': '=',
			'readonly': '=',
			'indeterminate': '=',
			'inverse': '=',
			'radioAllOff': '=',
			'onColor': '=',
			'offColor': '=',
			'onText': '=',
			'offText': '=',
			'labelText': '=',
			'handleWidth': '=',
			'labelWidth': '=',
			'baseClass': '=',
			'wrapperClass': '='
		},
		link: function(scope, element) {
			$(element).bootstrapSwitch(scope);
		}
	};
});
