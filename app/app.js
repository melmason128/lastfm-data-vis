var LastFMDataVis;
(function (LastFMDataVis) {
    // Declare app level module which depends on views, and components
    angular.module('lastFMDataVisApp', [
        'ngRoute',
        'myApp.version'
    ])
        .controller('dashboardController', function () {
        return new LastFMDataVis.Dashboard.DashboardController();
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