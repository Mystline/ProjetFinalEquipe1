angular.module('projetequipe1', ['ngRoute'])
.run(['$rootScope', function ($rootScope, $location) {

	$rootScope.changeView = function(view){
        $location.path(view); // path not hash
    }
        
}])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/voyages', {
        templateUrl: 'voyages/voyages.html',
    });
    $routeProvider.when('/jours', {
        templateUrl: 'jours/jours.html',
    });
	$routeProvider.when('/activites', {
        templateUrl: 'activites/activites.html',
    });
	$routeProvider.when('/transports', {
        templateUrl: 'transports/transports.html',
    });	
	$routeProvider.when('/utilisateurs', {
        templateUrl: 'utilisateurs/utilisateurs.html',
    });
    $routeProvider.otherwise({ redirectTo: '/voyages' });
}]);