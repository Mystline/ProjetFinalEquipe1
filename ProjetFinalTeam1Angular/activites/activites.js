angular.module('projetequipe1.activites', [])

.controller('ActiviteController', ActiviteController)

            
function ActiviteController($scope, $rootScope, $http, $route, $sce, $compile, $timeout) {
    
    var API_KEY = "AIzaSyDY1hVrLnYHWLhr4X-RzJs5c2Y6r-43hwM";
    
    $scope.showList = true;
    $scope.showRecherche = false;
    $scope.showAjout = false;
    
    $scope.latitudeRecherche = 45.501459;
    $scope.longitudeRecherche = -73.567543;
    
    $scope.activites = [];
    
    
    $scope.ajouterActivites = function () {
        if($scope.HeureDebut == "" || $scope.HeureFin == "" || $scope.Cout == ""||$scope.latitudeRecherche == ""||$scope.longitudeRecherche == "")
        {
            alert("Un ou plusieurs champs ne sont pas valides");
        }
        else
        {
            console.log($rootScope.JourSelect);
            
            var dt = $scope.HeureDebut;
                    var dtstring = dt.getFullYear()
                    + '-' + pad2(dt.getMonth()+1)
                    + '-' + pad2(dt.getDate())
                    + ' ' + pad2(dt.getHours())
                    + ':' + pad2(dt.getMinutes())
                    + ':' + pad2(dt.getSeconds());
            
            
            var dt2 = $scope.HeureFin;
                    var dtstring2 = dt2.getFullYear()
                    + '-' + pad2(dt2.getMonth()+1)
                    + '-' + pad2(dt2.getDate())
                    + ' ' + pad2(dt2.getHours())
                    + ':' + pad2(dt2.getMinutes())
                    + ':' + pad2(dt2.getSeconds());
            
            
            $rootScope.JourSelect.VoyageId = null;
            
            $.ajax({
                method: 'POST',
                url: "http://localhost:3216/api/Activites/",
                data: {
                    Jour:$rootScope.JourSelect,
                    HeureDebut: dtstring,
                    HeureFin: dtstring2,
                    Cout: $scope.Cout,
                    Latitude:$scope.latitudeRecherche,
                    Longitude:$scope.longitudeRecherche,
                }
            }).success(function (data)  {
                console.log(data);
                $scope.ajoutEffectue = true;
                $scope.$apply();
            }).error(function (data) {
                console.log("erreur ajout activites");
            });
        }
        
        $scope.getList();
    }
    
    $scope.getActivites = function() {
        
        var jour = $rootScope.JourSelect;
        
        $.ajax({
            method: 'GET',
            url: "http://localhost:3216/api/Activites/GetActivitesJour?jourId="+$rootScope.JourSelect.Id,
            error: function (data) {
                console.log("Aucun jour de selectionner ou autre erreur")
            },
            success: function(response)
            {
                //console.log(response);        

                for(var i =0; i< response.length; i++)
                {
                    var num = i+1;
                    $scope.activites.push({HeureDebut:response[i].HeureDebut, HeureFin:response[i].HeureFin, Cout: response[i].Cout, Longitude: response[i].Longitude, Latitude: response[i].Latitude});
                }
                $scope.$apply();
            }
        });

    }
    
    //État recherche ou ajout d'une activité dans la vue
    $scope.getAjout = function(place) {
     
        console.log(place);
        
        $scope.showAjout = true;
        $scope.showList = false;
        $scope.showRecherche = false;    
        
        $scope.resetValue();
        
        
        if(place != null)
        {
            // anything you want can go here and will safely be run on the next digest.

            console.log("selection suggestion");
            $scope.Latitude = place.geometry.location.lat();
            $scope.Longitude = place.geometry.location.lng();
            
            console.log($scope.Longitude );
            console.log($scope.Latitude );
        }
    
    }
    
    $scope.getList = function()
    {
        $scope.showList = true;
        $scope.showAjout = false;
        $scope.showRecherche = false;    
        
        $scope.getActivites();
    }
    
    $scope.getRecherche = function()
    {
        $scope.showList = false;
        $scope.showAjout = false;
        $scope.showRecherche = true;      
    }
    
    //Pour nettoyer le visuel et remettre les valeurs par défaut
    $scope.resetValue = function()
    {
        $scope.Latitude= "";
        $scope.Longitude = "";
        
        $scope.belleAdresse = "";
        
        $scope.HeureDebut = "";
        $scope.HeureFin = "";
        $scope.Cout = ""; 
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
                
                var count = 0;
                var index = 0;
                
                console.log(results[index].types[0]);
                console.log(results[index].types.length);
                
                
                while(count != 5)
                {                                  
                    
                    for(var e = 0; e<results[index].types.length; e++)
                    {
                        if(results[index].types[e] == "lodging" || 
                          results[index].types[e] == "restaurant" || 
                          results[index].types[e] == "food" || 
                          results[index].types[e] == "point of interest" || 
                          results[index].types[e] == "point_of_interest" )
                        {
                            console.log(results);
                            console.log(results[index]);
                            console.log(results[index].geometry);
                            var test = results[index].geometry.location;
                            console.log(bounds);
                            
                            bounds.extend(results[index].geometry.location);
                            
                            $scope.places.push(results[index]);
                            var marker = new google.maps.Marker({
                                position: results[index].geometry.location,
                                map: map,
                                icon: results[index].icon,
                                name: results[index].name
                            })
                            $scope.markers.push(marker);
                            var content = '<div><div id="infowindow_content" ng-include src="\'info.html\'"></div><div>';
                            google.maps.event.addListener(marker, 'click', 
                                (function( marker , scope, content , place ){
                                    return function(){
                                        $rootScope.place = place;
                                        var compiled = $compile(content)(scope);
                                        scope.$apply();
                                        scope.$apply();
                                        scope.infoWindow.setContent( compiled[0] );
                                        scope.infoWindow.open( map , marker );                                        
                                    };
                            })( marker , $scope, content , results[index] )
                        );
                                                       
                            e=results[index].types.length;
                            count++;
                        }
                    }
                    
                   index++;                
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
    
    
    //Pour former une date
    function pad2(number) {
        return (number < 10 ? '0' : '') + number
    }   
    
    
    $scope.getActivites();
    
}
