'use strict';

/* Author: Mark Streichan
 Username: onemangroup
 Date: 17.09.2013
 */

var app = angular.module('radomizerApp', ['Facebook', 'randomizerFilters', 'pascalprecht.translate', 'ui', 'ui.sortable', 'ui.bootstrap']);

angular.module('ui.sortable').value('uiSortableConfig', {
    sortable: {
        connectWith: '.column',
        update: 'itemsChanged',
        cursor: 'move'
    }
});

app.config([
    'FacebookProvider',
    '$routeProvider',
    function(FacebookProvider, $routeProvider) {

        // Define your routes through $routeProvider and else...

        /**
         * Here you could set your appId throug the setAppId method and then initialize
         * or use the shortcut in the initialize method directly.
         */
        FacebookProvider.init('691726554190169');

    }
])

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/generate', {templateUrl: 'partials/generate.html',   controller: 'ExerciseCtrl'}).
        when('/show/:id', {templateUrl: 'partials/show.html', controller: 'ExerciseDetailCtrl'}).
        otherwise({redirectTo: '/generate'});
}])

app.config(['$translateProvider', function ($translateProvider, $rootScope) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'data/locale-',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage('de_DE');
}]);

// Declare app level module which depends on filters, and services

