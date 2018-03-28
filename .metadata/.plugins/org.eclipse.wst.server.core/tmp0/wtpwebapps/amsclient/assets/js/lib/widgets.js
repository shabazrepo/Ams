$(document).ready(function() {
	'use strict';

	/* ===== Sparkline Inline Charts ==== */
	/* Ref: http://omnipotent.net/jquery.sparkline/#s-docs */

	/* Line Chart */
	/* Docs: http://omnipotent.net/jquery.sparkline/#line */
	$('.sparkline-line-mini').sparkline(
		'html',
		{
			type: 'line',
			defaultPixelsPerValue: 10,
			width: "100%",
			height: 30,
			lineColor: '#fff',
			fillColor: false,
			spotColor: 'rgba(256, 256, 256, 0.5)',
			minSpotColor: 'rgba(256, 256, 256, 0.5)',
			maxSpotColor: 'rgba(256, 256, 256, 0.5)',
			spotRadius: 3,
			highlightSpotColor: 'rgba(256, 256, 256, 0.8)',
			highlightLineColor: 'rgba(256, 256, 256, 0.8)',
			lineWidth: 2
		}
	);

	/* Bar Chart */
	/* Docs: http://omnipotent.net/jquery.sparkline/#line */
	$('.sparkline-bar-mini').sparkline(
		'html',
		{
			type: 'bar',
			width: "100%",
			height: 30,
			barColor: '#fff',
			negBarColor: '#fff',
			zeroColor: '#fff',
			barWidth: 5,
			barSpacing: 2
		}
	);
});
