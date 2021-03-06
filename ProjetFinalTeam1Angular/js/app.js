angular.module('projetequipe1', [
    'ngRoute', 
    'uiGmapgoogle-maps',
    
    'projetequipe1.activites',
    'projetequipe1.transportsService',
    'projetequipe1.transports',
    'projetequipe1.activitesService',
    'projetequipe1.joursService',
    'projetequipe1.voyagesService',
    'projetequipe1.globalService'
])

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