angular.module('icheck', []).directive('icheck', function() {
	'use strict';

	return {
		restrict: 'AE',
		scope: {
			checkboxClass: '=',
			radioClass: '=',
			checkedClass: '=',
			checkedCheckboxClass: '=',
			checkedRadioClass: '=',
			uncheckedClass: '=',
			uncheckedCheckboxClass: '=',
			uncheckedRadioClass: '=',
			disabledClass: '=',
			disabledCheckboxClass: '=',
			disabledRadioClass: '=',
			enabledClass: '=',
			enabledCheckboxClass: '=',
			enabledRadioClass: '=',
			indeterminateClass: '=',
			indeterminateCheckboxClass: '=',
			indeterminateRadioClass: '=',
			determinateClass: '=',
			determinateCheckboxClass: '=',
			determinateRadioClass: '=',
			hoverClass: '=',
			focusClass: '=',
			activeClass: '=',
			labelHover: '=',
			labelHoverClass: '=',
			increaseArea: '=',
			cursor: '=',
			inheritClass: '=',
			inheritID: '=',
			aria: '=',
			insert: '='
		},
		link: function(scope, element) {
			$(element).iCheck(scope);
		}
	};
});
