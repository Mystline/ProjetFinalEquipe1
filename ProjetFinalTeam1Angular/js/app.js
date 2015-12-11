angular.module('projetequipe1', ['ngRoute', 'uiGmapgoogle-maps'])
.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDY1hVrLnYHWLhr4X-RzJs5c2Y6r-43hwM',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
})
.run(['$rootScope', '$location', function ($rootScope, $location) {

	$rootScope.changeView = function(view){
        $location.path(view); // path not hash
    }
        
}])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/voyages', {
        templateUrl: 'voyages/voyages.html' 
    });
    $routeProvider.when('/jours', {
        templateUrl: 'jours/jours.html'
    });
	$routeProvider.when('/activites', {
        templateUrl: 'activites/activites.html'
    });
	$routeProvider.when('/transports', {
        templateUrl: 'transports/transports.html'
    });	
	$routeProvider.when('/utilisateurs', {
        templateUrl: 'utilisateurs/utilisateurs.html'
    });
    $routeProvider.when('/Login', {
        templateUrl: 'Login/Login.html'
    });
    $routeProvider.otherwise({ redirectTo: '/voyages' });
}]);