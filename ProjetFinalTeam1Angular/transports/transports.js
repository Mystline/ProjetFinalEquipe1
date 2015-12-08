angular
    .module('projetequipe1')
    .controller('TransportController',['$scope', '$rootScope', '$http', '$route', '$sce',
 
function TransportController($scope, $rootScope, $http, $route, $sce) {
    //Variables
    var map;
    var center = new google.maps.LatLng(45.501459, -73.567543);
    
    //---------------------------------------------------------------------
    //Geolocalisation
    /*if (navigator.geolocation)
    {   
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
       
    }
    else
    {
        alert("Geolocation is not supported by this browser.");
    }*/
    
    //$scope.center = { latitude: 45.501459, longitude: -73.567543 };
    
    //---------------------------------------------------------------------
    //Initialiser la map
    function initialize() {
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: center,
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        map = new google.maps.Map(mapCanvas, mapOptions);
    }
    google.maps.event.addDomListener(window, 'load', initialize);
    
    //---------------------------------------------------------------------
    //Methodes
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    $scope.ajouterMarker = function (){
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(45.501459, -73.567543),
            map: map,
            icon: '../Images/markerBlack.png'
            //icon: iconBase + 'schools_maps.png'
            //title: 'Voila un icon noir!'
        });
    }
    
}]);