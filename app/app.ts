module LastFMDataVis {

// Declare app level module which depends on views, and components
    angular.module('lastFMDataVisApp', [
        'ngRoute',
        'myApp.version'
    ])

    //TODO: look into potential security issues of exposing api key
    // - main issue would be someone using it for their own app and going over my usage limits (unlikely given how available api keys are), so seems low risk
    .constant('lastFmApiKey','53a22d9927d21c4cd94b6a4ed4c383e2')
    .constant('lastFmApiBaseUrl','http://ws.audioscrobbler.com/2.0/')

    .factory('lastFmService', function($http, lastFmApiBaseUrl, lastFmApiKey){
        return new Data.LastFMService($http, lastFmApiBaseUrl, lastFmApiKey);
    })
    //TODO: remove once lastfm is running again
    .factory('mockLastFmService', function($q){
        return new Data.MockLastFMService($q);
    })

    //TODO: change back to real service once lastfm is running again
    .controller('dashboardController', function(mockLastFmService) {
        return new Dashboard.DashboardController(mockLastFmService);
    })

    //Routing
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/dashboard', {
                templateUrl: 'dashboard/dashboard.html'
            })
            .otherwise({redirectTo: '/dashboard'});
    }]);

}