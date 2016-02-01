var LastFMDataVis;
(function (LastFMDataVis) {
    // Declare app level module which depends on views, and components
    angular.module('lastFMDataVisApp', [
        'ngRoute',
        'myApp.version'
    ])
        .constant('lastFmApiKey', '53a22d9927d21c4cd94b6a4ed4c383e2')
        .constant('lastFmApiBaseUrl', 'http://ws.audioscrobbler.com/2.0/')
        .factory('lastFmService', function ($http, lastFmApiBaseUrl, lastFmApiKey) {
        return new LastFMDataVis.Data.LastFMService($http, lastFmApiBaseUrl, lastFmApiKey);
    })
        .controller('dashboardController', function (lastFmService) {
        return new LastFMDataVis.Dashboard.DashboardController(lastFmService);
    })
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/dashboard', {
                templateUrl: 'dashboard/dashboard.html'
            })
                .otherwise({ redirectTo: '/dashboard' });
        }]);
})(LastFMDataVis || (LastFMDataVis = {}));
//# sourceMappingURL=app.js.map