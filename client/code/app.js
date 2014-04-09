'use strict';

// Declare app level module which depends on filters, and services

var app = angular.module('vpdb', [
	'ngRoute',
	'ngAnimate',
	'ngSanitize',
	'ui.bootstrap',
	'sun.scrollable',
	'vpdb.controllers',
	'vpdb.filters',
	'vpdb.services',
	'vpdb.directives'
]);

app.config(function($routeProvider, $locationProvider) {

	$routeProvider.
		when('/tables', {
			templateUrl: 'partials/tables'
		}).

		when('/table/:id', {
			templateUrl: 'partials/table'
		}).

		otherwise({
			redirectTo: '/tables'
		});

	$locationProvider.html5Mode(true);

});

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame    ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-49887651-1', 'vpdb.ch');
ga('send', 'pageview');