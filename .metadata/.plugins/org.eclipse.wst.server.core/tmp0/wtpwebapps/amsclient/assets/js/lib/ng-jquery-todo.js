angular.module('jqueryTodo', []).directive('jqueryTodo', function() {
	'use strict';
	return {
		restrict: 'AE',
		scope: {
			title: '@',
			removeLabel: '@',
			newItemPlaceholder: '@',
			editItemTooltip: '@',
			focusOnTitle: '@',
			items: '=?'
		},
		link: function(scope, element) {
			scope.removeLabel = scope.removeLabel || "Delete?";
			scope.newItemPlaceholder = scope.newItemPlaceholder || "Add a new item";
			scope.editItemTooltip = scope.editItemTooltip|| "Click to edit";
			scope.focusOnTitle = scope.focusOnTitle || false;
			scope.$watch('items', function() {
				$(element).empty().todoList(scope);
			});
		}
	};
});
