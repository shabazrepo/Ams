angular.module('notify', []).directive('notify', function() {
	'use strict';

	return {
		restrict: 'A',
		scope: {
			clickToHide: "@?",
			autoHide:  "@?",
			autoHideDelay: "@?",
			arrowShow: "@?",
			arrowSize: "@?",
			breakNewLines: "@?",
			elementPosition: "@?",
			globalPosition: "@?",
			notifyStyle: "@?",
			notifyClassName: "@?",
			showAnimation: "@?",
			showDuration: "@?",
			hideAnimation: "@?",
			hideDuration: "@?",
			gap: "=?"
		},
		link: function(scope, element, attr) {
			var content = attr.notify,
				keys = ['clickToHide', 'autoHide', 'autoHideDelay', 'arrowShow', 'arrowSize', 'breakNewLines', 'elementPosition', 'globalPosition', 'notifyStyle', 'notifyClassName', 'showAnimation', 'showDuration', 'hideAnimation', 'hideDuration', 'gap'],
				options = {};

			$.notify.addStyle("appkit", {
				html: "<div>\n<span data-notify-html></span>\n</div>",
			});

			keys.forEach(function(key) {
				if(scope[key]) {
					if(key == 'notifyStyle') {
						options.style = scope.notifyStyle;
					} else if(key == 'notifyClassName') {
						options.className = scope.notifyClassName;
					} else {
						options[key] = scope[key];
					}
				}
			});

			element.on('click', function() {
				$.notify(content, options);
			});
		}
	};
});
