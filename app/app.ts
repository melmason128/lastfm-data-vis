module LastFMDataVis {

// Declare app level module which depends on views, and components
    angular.module('lastFMDataVisApp', [
        'ngRoute',
        'myApp.version',
        'lastFMDataVisApp.barchart'
    ])

    //TODO: look into potential security issues of exposing api key
    // - main issue would be someone using it for their own app and going over my usage limits (unlikely given how available api keys are), so seems low risk
    .constant('lastFmApiKey','53a22d9927d21c4cd94b6a4ed4c383e2')
    .constant('lastFmApiBaseUrl','http://ws.audioscrobbler.com/2.0/')

    .factory('lastFmService', ($http, lastFmApiBaseUrl, lastFmApiKey)=>{
        return new Data.LastFMService($http, lastFmApiBaseUrl, lastFmApiKey);
    })

    //.factory('mockLastFmService', function($q){
    //    return new Data.MockLastFMService($q);
    //})

    .controller('dashboardController', (lastFmService)=> {
        return new Dashboard.DashboardController(lastFmService);
    })

    //Routing
    .config(['$routeProvider',  ($routeProvider) => {
        $routeProvider
            .when('/dashboard', {
                templateUrl: 'dashboard/dashboard.html'
            })
            .otherwise({redirectTo: '/dashboard'});
    }]);

}