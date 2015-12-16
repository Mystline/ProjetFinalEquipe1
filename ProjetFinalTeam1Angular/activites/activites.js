angular.module('projetequipe1.activites', [])

.controller('ActiviteController', ActiviteController)

            
function ActiviteController($scope, $rootScope, $http, $route, $sce, $compile) {
    
    var API_KEY = "AIzaSyDY1hVrLnYHWLhr4X-RzJs5c2Y6r-43hwM";
    
    $scope.selectState = false;
    
    $scope.latitudeRecherche = 45.501459;
    $scope.longitudeRecherche = -73.567543;
    
    $scope.activites = [];
    
    
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
                $scope.ajoutEffectue = true;
                $scope.$apply();
            }).error(function (data) {
                console.log("erreur ajout activites");
            });
        }
    }
    
    //État recherche ou ajout d'une activité dans la vue
    $scope.selectChangeState = function(place) {
     
        resetValue();
        $scope.selectState = !$scope.selectState;
        
        $rootScope.$apply();
     
    }
    
    //Pour nettoyer le visuel et remettre les valeurs par défaut
    function resetValue()
    {
        

        $scope.rechercheState = false;
        $scope.ajoutEffectue = false;

        $scope.belleAdresse = "";
        
        $scope.HeureDebut = "";
        $scope.HeureFin = "";
        $scope.Cout = "";
        $scope.Latitude = "";
        $scope.Longitude = "";   
    }
    

    //
    //Code pour gérer les suggestions afficher par rapport à la recherche effectuée
    //
    $scope.doGeo = function()
    {
        
        //
        //(à l'intérieur de doGeo())
        //Associe les valeurs de la recherche de suggestions aux variable nécéssaire
        //
        var mapOptions = {
                    center: { lat: $scope.latitudeRecherche, lng: $scope.longitudeRecherche },
                    zoom: 8
                };
        var map = new google.maps.Map(document.getElementById('map-places'),mapOptions);
        var request = {
            location: { lat: $scope.latitudeRecherche, lng: $scope.longitudeRecherche },
            radius: '10000'

            // https://developers.google.com/places/documentation/supported_types
            //types: ['food']
        };
        
        
        //
        //(à l'intérieur de doGeo()) 
        //Code pour afficher 5 suggestions
        //
        console.log($scope.latitudeRecherche);
        console.log($scope.longitudeRecherche);
        console.log(map);   
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, function (results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log(results);
                $scope.places = [];
                $scope.markers = [];
                $scope.infoWindow = new google.maps.InfoWindow();
                var bounds = new google.maps.LatLngBounds();
                for(i=0; i<5; i++) {
                    bounds.extend(results[i].geometry.location);
                    $scope.places.push(results[i]);
                    var marker = new google.maps.Marker({
                        position: $scope.places[i].geometry.location,
                        map: map,
                        icon: results[i].icon,
                        name: results[i].name
                    })
                    $scope.markers.push(marker);
                    var content = '<div><div id="infowindow_content" ng-include src="\'info.html\'"></div><div>';
                    google.maps.event.addListener(marker, 'click', 
                        (function( marker , scope, content , place ){
                            return function(){
                                $rootScope.place = place;
                                var compiled = $compile(content)(scope);
                                scope.$apply();
                                scope.infoWindow.setContent( compiled[0] );
                                scope.infoWindow.open( map , marker );                                        
                            };
                        })( marker , $scope, content , results[i] )
                    );
                }
                map.fitBounds(bounds);
                
                //Afficher le bouton ajouter pour l'activité recherché
                $scope.rechercheState = true;
                
                $scope.$apply();
            }
        });
    }
    
    
    //
    //Code pour faire une recherche en envoyant un string en paramètre et l'afficher sur une map google
    //
    $scope.center = { latitude: 45.501459, longitude: -73.567543 };
    $scope.geocode = function() {
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+$scope.adresse+'&key='+API_KEY)
        .success(function(data){
            $scope.belleAdresse = data.results[0].formatted_address;
            loc = data.results[0].geometry.location;
            neb = data.results[0].geometry.viewport.northeast;
            swb = data.results[0].geometry.viewport.southwest;
            $scope.latitudeRecherche = loc.lat;
            $scope.longitudeRecherche = loc.lng;                        
            $scope.location = { latitude: loc.lat, longitude: loc.lng }
            $scope.center = $scope.location;
            $scope.bounds = { northeast : { latitude: neb.lat, longitude: neb.lng }, southwest : { latitude: swb.lat, longitude: swb.lng } };
            
            $scope.doGeo();
        });
    };
    
}
