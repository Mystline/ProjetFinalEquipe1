angular.module('projetequipe1.transports', [])

.controller('TransportController', TransportController)
 
function TransportController($scope, $rootScope, $http, $route, $sce, DataService, TransportsService) {
    //================================================================================
    //TODO: Get le nombre de jours du voyage.
    //$scope.lstJours = [];
    //$scope.lstNumJours = [];
    
    /*function getJoursVoyage() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3216/api/Jours/GetJoursVoyage',
            data:
            {
                voyageId: $rootScope.voyageSelect.Id
            }
        }).success(function(data) {
            console.log(data);
            for(var i=0; i<data.length; i++)
            {
                $scope.lstJours.push(data[i]);
            }
            
            for(var i =0; i< $scope.lstJours.length; i++)
            {
                var num = i+1;
                $scope.lstNumJours.push(num);
            }
        })
    }*/
    //Exécute la methode.
    //getJoursVoyage();
    //================================================================================
    
    
    $scope.lstTransports = DataService.lstTransports;
    
    //TODO: Trouver le moyen de mettre à jour la liste index.
    $scope.$watch('DataService.lstTransports', function(newVal, oldVal, scope) {
        scope.lstTransports = DataService.lstTransports;
    });
    
    
    //=====================================================================
    //*************************GESTION GOOGLE MAP**************************
    //=====================================================================
    
    //Variables
    var mapIndex;
    var mapAjout;
    var markerMapAjout;
    var center = new google.maps.LatLng(45.501459, -73.567543);
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    
    
    //--------------------------------------------
    //GEOLOCALISATION
    //--------------------------------------------
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
    
    
    //--------------------------------------------
    //INITIALISER LA MAP
    //--------------------------------------------
    function initialize(map) {
        var mapCanvas = document.getElementById(map);
        var mapOptions = {
            center: center,
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        if(map == 'mapIndex')
        {
            mapIndex = new google.maps.Map(mapCanvas, mapOptions);
        }
        else
        {
            mapAjout = new google.maps.Map(mapCanvas, mapOptions);
        }
    }
    initialize('mapIndex');
    //initialize('mapAjout');
    
    
    //??????????????
    //google.maps.event.addDomListener(window, 'load', initialize);
    
    
    //=====================================================================
    //***********************GOOGLE MAP (METHODES)*************************
    //=====================================================================

    
    //GEOCODE
    var API_KEY = "AIzaSyDY1hVrLnYHWLhr4X-RzJs5c2Y6r-43hwM";
    
    $scope.geocode = function(adresse, btn) {
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?sensor=false&address='+ adresse + '&key='+API_KEY)
        .success(function(data){
            console.log(data);
            
            /*$scope.mapAjout = {
                center: { latitude: data.results[0].geometry.location.lat, longitude: data.results[0].geometry.location.long },
                marker: { latitude: data.results[0].geometry.location.lat, longitude: data.results[0].geometry.location.long },
                zoom: 12
            };*/
            
            if(btn == 'depart')
            {
                $scope.latDepart = data.results[0].geometry.location.lat;
                $scope.longDepart = data.results[0].geometry.location.lng;
            }
            else
            {
                $scope.latArrive = data.results[0].geometry.location.lat;
                $scope.longArrive = data.results[0].geometry.location.lng;
            }
            
            
            /*$scope.belleAdresse = data.results[0].formatted_address;
            loc = data.results[0].geometry.location;
            //neb = data.results[0].geometry.viewport.northeast;
            //swb = data.results[0].geometry.viewport.southwest;
            $scope.latitudeRecherche = loc.lat;
            $scope.longitudeRecherche = loc.lng;                        
            $scope.location = { latitude: loc.lat, longitude: loc.lng }
            //$scope.center = $scope.location;
            //$scope.bounds = { northeast : { latitude: neb.lat, longitude: neb.lng }, southwest : { latitude: swb.lat, longitude: swb.lng } };*/

            //$scope.doGeo();
        });
    }
    
    
    //=====================================================================
    //***********************GOOGLE MAP (MARKERS)**************************
    //=====================================================================
    $scope.afficherEndroit = function (lat, long){
        $scope.mapAjout = {
            center: { latitude: lat, longitude: long }, 
            marker: { latitude: lat, longitude: long }, 
            zoom: 12
        };
    }
    
    
    $scope.ajouterMarker = function (lat, long){
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, long),
            map: mapAjout,
            icon: '../Images/markerBlack.png'
            //icon: iconBase + 'schools_maps.png'
            //title: 'Voila un icon noir!'
        });
    }
    
    
    //=====================================================================
    //**********************GOOGLE MAP (ITINERAIRES)***********************
    //=====================================================================
    
    $scope.afficherItineraireSansCoord = function(debut, arrive) {
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();

        var request = {
            origin: debut,
            destination: arrive,
            avoidHighways: true,
            travelMode: google.maps.TravelMode['DRIVING']
        };
        directionsDisplay.setMap(mapIndex);

        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
    }
    
    $scope.afficherItineraireAvecCoordonnees = function(type, latDebut, longDebut, latArrive, longArrive) {
        if(type == 'Avion' || type == 'avion')
        {
            $scope.initPlane(latDebut, longDebut, latArrive, longArrive);
        }
        else
        {
            initialize('mapIndex');
            
            var directionsService = new google.maps.DirectionsService();
            var directionsDisplay = new google.maps.DirectionsRenderer();

            var request = {
                origin: new google.maps.LatLng(latDebut, longDebut),
                destination: new google.maps.LatLng(latArrive, longArrive),
                avoidHighways: true,
                travelMode: google.maps.TravelMode['DRIVING']
            };
            directionsDisplay.setMap(mapIndex);

            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
        }
    }
    
    
    //--------------------------------------------------------------------------------------------
    /*The maximum allowed waypoints is 8, plus the origin, and destination.*/
    //Pour initialiser la map
    /*$scope.initMap = function(id,mode) {
        var mapOptions = {
            center: { lat: 45.501459, lng: -73.567543 },
            zoom: 8
        };
        var map = new google.maps.Map(document.getElementById(id),mapOptions);

        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();

        var request = {
            origin:'Masson Montreal',
            destination:'Cégep Édouard Montpetit',
            avoidHighways: true,
            travelMode: google.maps.TravelMode[mode]
        };
        directionsDisplay.setMap(map);

        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
    }*/
    //--------------------------------------------------------------------------------------------
    
    
    
    //--------------------------------------------
    //Pour itineraire avec waypoints
    //--------------------------------------------
    $scope.initWayp = function() {
        var mapOptions = {
            center: { lat: 45.501459, lng: -73.567543 },
            zoom: 8
        };
        var map = new google.maps.Map(document.getElementById('map-wayp'),mapOptions);

        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();

        var request = {
            origin:'Masson Montreal',
            destination:'Cégep Édouard Montpetit',
            waypoints: [{
                  location:"Boucherville",
                  stopover:false
                },{
                  location:'APPCOM Longueuil',
                  stopover:true
                }],
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsDisplay.setMap(map);

        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
    }
    
    //--------------------------------------------
    //Pour itineraire en avion
    //--------------------------------------------
    $scope.initPlane = function(latDebut, longDebut, latArrive, longArrive) {
        var myLatLng = new google.maps.LatLng(0, -180);
        var myOptions = {
            zoom: 2,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };

        mapIndex = new google.maps.Map(document.getElementById("mapIndex"),myOptions);
        var flightPlanCoordinates = [
            new google.maps.LatLng(latDebut, longDebut),
            new google.maps.LatLng(latArrive, longArrive)
            /*new google.maps.LatLng(37.772323, -122.214897),
            new google.maps.LatLng(-27.46758, 153.027892)*/
/*            new google.maps.LatLng(21.291982, -157.821856),
            new google.maps.LatLng(-18.142599, 178.431),
            new google.maps.LatLng(-27.46758, 153.027892)*/
        ];
        var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        flightPath.setMap(mapIndex);
    }
    

    //=====================================================================
    //************************GESTION DES SECTIONS*************************
    //=====================================================================
    $scope.resetValueDansCreation = function(){
        $scope.cout = "";
        $scope.type = "";
        $scope.transporteur = "";
        
        $scope.endroitDepart = "";
        $scope.endroitArrive = "";
        
        $scope.latDepart = "";
        $scope.longDepart = "";
        $scope.latArrive = "";
        $scope.longArrive = "";
    }
    
    $scope.afficherPage = function(page) {
        switch(page) {
            case "Index":
                $scope.pageIndex = true;
                $scope.pageCreate = false;
                $scope.pageModif = false;
                $scope.pageSupprimer = false;
                break;
                
            case "Create":
                $scope.pageIndex = false;
                $scope.pageCreate = true;
                $scope.pageModif = false;
                $scope.pageSupprimer = false;
                break;
                
            case "Modif":
                $scope.pageIndex = false;
                $scope.pageCreate = false;
                $scope.pageModif = true;
                $scope.pageSupprimer = false;
                break;
            case "Supp":
                $scope.pageIndex = false;
                $scope.pageCreate = false;
                $scope.pageModif = false;
                $scope.pageSupprimer = true;
                break;
        }
    }
    
    
    //=====================================================================
    //**************************GESTION TRANSPORT**************************
    //=====================================================================

    //--------------------------------------------
    //***INDEX
    //--------------------------------------------
    //Tous les transports
    function getAllTransports() {
        TransportsService.getTransports();
    }
    
    //Les transports de la journee selectionne
    function getTransportsVoyage() {
        
        if($rootScope.voyageSelect == null)
        {
            getAllTransports();
        }
        else
        {
            TransportsService.getTransportsVoyage($rootScope.voyageSelect.Id);
        }
    }
    
    //**Les transports du voyage selectionne
    function getTransportsJour() {
        
        if($rootScope.voyageSelect == null)
        {
            getAllTransports();
        }
        else
        {
            TransportsService.getTransportsVoyage($rootScope.voyageSelect.Id);
        }
    }
    
    //Exécute la methode quand on arrive sur la page Transport.
    getTransportsJour($rootScope.JourSelect);
    $scope.afficherPage('Index');
    
    //--------------------------------------------
    //**CREATE
    //--------------------------------------------
    $scope.createNewTransport = function() {
        
        var newTransport = {
            cout: $scope.cout,
            type: $scope.type,
            transporteur: $scope.transporteur,
            latDepart: $scope.latDepart,
            longDepart: $scope.longDepart,
            latArrive: $scope.latArrive,
            longArrive: $scope.longArrive,
            jour: $rootScope.JourSelect
        }
        
        TransportsService.createTransport(newTransport);
    }
    
    //--------------------------------------------
    //***MODIFIER
    //--------------------------------------------
    /*$scope.modifierTransport = function() {
        var transportModif = {
            cout: $scope.cout,
            type: $scope.type,
            transporteur: $scope.transporteur,
            latDepart: -73.567543,
            longDepart: 45.501459,
            latArrive: -70,
            longArrive: 45,
            jour: $rootScope.JourSelect
        }
        
        TransportsService.updateTransport(transportModif, $scope.transportID);
    }*/
    
    //--------------------------------------------
    //***SUPPRIMER
    //--------------------------------------------
    $scope.supprimerTransport = function(transportID) {
        
        TransportsService.deleteTransport(transportID);
    }
    
}







