angular
    .module('projetequipe1')
    .controller('TransportController',['$scope', '$rootScope', '$http', '$route', '$sce',
 
function TransportController($scope, $rootScope, $http, $route, $sce) 
{            
   if (navigator.geolocation) {
       
            navigator.geolocation.watchPosition(function(position) {
                
            $scope.latitude = position.coords.latitude;
            $scope.longitude = position.coords.longitude;  
                
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude+'&key=AIzaSyDY1hVrLnYHWLhr4X-RzJs5c2Y6r-43hwM')
            .success(function(data){
                console.log(data);
                
                $scope.belleAdresse = data.results[0].formatted_address;
                loc = data.results[0].geometry.location;
                neb = data.results[0].geometry.viewport.northeast;
                swb = data.results[0].geometry.viewport.southwest;                      
                $scope.location = { latitude: loc.lat, longitude: loc.lng }
                $scope.center = $scope.location;
                $scope.bounds = { northeast : { latitude: neb.lat, longitude: neb.lng }, southwest : { latitude: swb.lat, longitude: swb.lng } };
            });
                
        });
       
    } else {
        alert("Geolocation is not supported by this browser.");
    }
    
    $scope.center = { latitude: 45.501459, longitude: -73.567543 };
}]);