/**
 * Created by Mel on 27/01/2016.
 */

module LastFMDataVis {

// Declare app level module which depends on views, and components
    angular.module('myApp', [
        'ngRoute',
        'myApp.version'
    ]).config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view2'});
    }]);

}