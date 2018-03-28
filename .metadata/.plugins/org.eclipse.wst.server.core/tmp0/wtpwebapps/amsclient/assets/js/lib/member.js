$(document).ready(function() {
	'use strict';

	/* ===== Morris Charts ==== */
	/* Ref: http://morrisjs.github.io/morris.js/ */


	Morris.Area({
		element: 'commits-chart',
		data: [
			{x: '2016-05-01', y: 2},
			{x: '2016-05-02', y: 4},
			{x: '2016-05-03', y: 9},
			{x: '2016-05-04', y: 8},
			{x: '2016-05-05', y: 3},
			{x: '2016-05-06', y: 6},
			{x: '2016-05-07', y: 19},
			{x: '2016-05-08', y: 12},
			{x: '2016-05-09', y: 23},
			{x: '2016-05-10', y: 12},
			{x: '2016-05-11', y: 16},
			{x: '2016-05-12', y: 11},
			{x: '2016-05-13', y: 3},
			{x: '2016-05-14', y: 5},
			{x: '2016-05-15', y: 3},
			{x: '2016-05-16', y: 12},
			{x: '2016-05-17', y: 7},
			{x: '2016-05-18', y: 15},
			{x: '2016-05-19', y: 3},
			{x: '2016-05-20', y: 23},
			{x: '2016-05-21', y: 9},
			{x: '2016-05-22', y: 2},
			{x: '2016-05-23', y: 7},
			{x: '2016-05-24', y: 18},
			{x: '2016-05-25', y: 6},
			{x: '2016-05-26', y: 14},
			{x: '2016-05-27', y: 11},
			{x: '2016-05-28', y: 28}
		],
		xkey: 'x',
		ykeys: ['y'],
		labels: ['Git Commits'],
		  lineColors: ['#F19D3F'],
		  lineWidth: 0,
		  fillOpacity: 0.9,
		  resize: true,
		  xLabels: "week",
		  pointSize: 0,
		  hideHover: "auto",
		  dateFormat: function (x) { return moment(x).format('DD MMM YYYY'); }
	}).on('click', function(i, row){
		console.log(i, row);
	});
});
