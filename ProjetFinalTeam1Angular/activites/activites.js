angular
    .module('projetequipe1.activites', [])
    .controller('ActiviteController',['$scope', '$rootScope', '$http', '$route', '$sce',
 
function ActiviteController($scope, $rootScope, $http, $route, $sce) {
    $scope.HeureDebut = "";
    $scope.HeureFin = "";
    $scope.Cout = "";
    $scope.Cout = "";
    $scope.Latitude = "";
    $scope.Longitude = "";
    
    $scope.activites = [];
    
    //---------------------------------------------------------------------    
    //GESTION GOOGLE MAP
    
    //Variables
    var map;
    var center = new google.maps.LatLng(45.501459, -73.567543);
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    
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
    initialize();
    
    //??????????????
    google.maps.event.addDomListener(window, 'load', initialize);
    
    
    //---------------------------------------------------------------------
    //******************************METHODES*******************************
    
    //---------------------------------------------------------------------
    //Markers
    $scope.afficherMarker = function (lat, long){
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, long),
            map: map,
            icon: '../Images/markerBlack.png'
            //icon: iconBase + 'schools_maps.png'
            //title: 'Voila un icon noir!'
        });
    }
    
    $scope.ajouterActivites = function () {
        if($scope.HeureDebut == "" || $scope.HeureFin == "" || $scope.Cout == ""||$scope.Latitude == ""||$scope.Longitude == "")
        {
            alert("Un ou plusieurs champs ne sont pas valides");
        }
        else
        {
            $.ajax({
                method: 'POST',
                url: "http://localhost:3216/api/Activites/",
                data: {
                    HeureDebut: $scope.HeureDebut,
                    HeureFin: $scope.HeureFin,
                    Cout: $scope.Cout,
                    Latitude:$scope.Latitude,
                    Longitude:$scope.Longitude,
                    Jour:$rootScope.JourSelect
                }
            }).success(function (data)  {
                console.log(data);
                $scope.$apply();
            }).error(function (data) {
                console.log("erreur ajout activites");
            });
        }
    }
    
}]);
