angular.module('appKitCommon', ['appKitTour']).config(function($interpolateProvider) {
	'use strict';

	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');
});
