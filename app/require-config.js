'use strict';

if(window.__karma__) {
	var allTestFiles = [];
	var TEST_REGEXP = /spec\.js$/;

	var pathToModule = function(path) {
		return path.replace(/^\/base\/app\//, '').replace(/\.js$/, '');
	};

	Object.keys(window.__karma__.files).forEach(function(file) {
		if (TEST_REGEXP.test(file)) {
			// Normalize paths to RequireJS module names.
			allTestFiles.push(pathToModule(file));
		}
	});
}

require.config({
	paths: {
		angular: '../bower_components/angular/angular',
		angularMocks: '../bower_components/angular-mocks/angular-mocks',
        angularMessages: '../bower_components/angular-messages/angular-messages',
        angularTranslate:'../bower_components/angular-translate/angular-translate',
        angularSanitize:'../bower_components/angular-sanitize/angular-sanitize',
		angularUiRouter:'../bower_components/angular-ui-router/angular-ui-router',
        angularTranslateLoaderStaticFiles:'../bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files',
		text: '../bower_components/requirejs-text/text'
	},
	shim: {
		'angular' : {'exports' : 'angular'},
        'angularMessages':['angular'],
        'angularSanitize':['angular'],
		'angularUiRouter':['angular'],
        'angularTranslate':['angularSanitize'],
        'angularTranslateLoaderStaticFiles':['angularTranslate'],
		'angularMocks': {
			deps:['angular'],
			'exports':'angular.mock'
		}
	},
	priority: [
		"angular"
	],
	deps: window.__karma__ ? allTestFiles : [],
	callback: window.__karma__ ? window.__karma__.start : null,
	baseUrl: window.__karma__ ? '/base/app' : ''
});

require([
	'angular',
	'app'
	], function(angular, app) {
		var $html = angular.element(document.getElementsByTagName('html')[0]);
		angular.element().ready(function() {
			// bootstrap the app manually
			//angular.bootstrap(document, ['myApp']);
            angular.bootstrap(document, [app]);
		});
	}
);