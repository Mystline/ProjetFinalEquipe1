angular.module('projetequipe1.transports', [])

.controller('TransportController', TransportController)
 
function TransportController($scope, $rootScope, $http, $route, $sce, TransportsService) {
    
    //TODO: Get le nombre de jours du voyage.
    $scope.jours = [];
    $scope.jours.push(0);
    $scope.jours.push(1);
    $scope.jours.push(2);
    $scope.jours.push(3);
    
    //TODO: Faire les vrais requets ajax au serveur.
    $scope.transports = [];
    $scope.transports.push(
        {Id:0, Cout:10, Type:"Auto", Transporteur:"Moi", Jour_Id:1, longitudeDepart:0, latitudeDepart:0 },
        {Id:1, Cout:10, Type:"Autobus", Transporteur:"RTL", Jour_Id:1, longitudeDepart:0, latitudeDepart:0 }
    );
    
    
    //=====================================================================
    //*************************GESTION GOOGLE MAP**************************
    //=====================================================================
    
    //Variables
    var map;
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
    
    
    //=====================================================================
    //***********************GOOGLE MAP (METHODES)*************************
    //=====================================================================

    //=====================================================================
    //***********************GOOGLE MAP (MARKERS)**************************
    //=====================================================================
    
    $scope.ajouterMarker = function (lat, long){
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, long),
            map: map,
            icon: '../Images/markerBlack.png'
            //icon: iconBase + 'schools_maps.png'
            //title: 'Voila un icon noir!'
        });
    }
    //???????????????
    /*$scope.afficherLesActivites = function () {
        $scope.ajouterMarker(45.501459, -73.567543);
    }*/
    
    //=====================================================================
    //**********************GOOGLE MAP (ITINERAIRES)***********************
    //=====================================================================
    
    $scope.afficherItineraire = function() {
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();

        var request = {
            origin:'Cégep Édouard Montpetit',
            destination:'170 Boulevard Taschereau, La Prairie, QC J5R 1S8',
            avoidHighways: true,
            travelMode: google.maps.TravelMode['DRIVING']
        };
        directionsDisplay.setMap(map);

        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
    }
    
    $scope.afficherItineraireAvecCoordonnees = function(latDebut, longDebut, latArrive, longArrive) {
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();

        var request = {
            //origin:'Cégep Édouard Montpetit',
            origin: new google.maps.LatLng(latDebut, longDebut),
            destination: new google.maps.LatLng(latArrive, longArrive),
            avoidHighways: true,
            travelMode: google.maps.TravelMode['DRIVING']
        };
        directionsDisplay.setMap(map);

        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
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
    $scope.initPlane = function() {
        var myLatLng = new google.maps.LatLng(0, -180);
        var myOptions = {
            zoom: 3,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };

        var map = new google.maps.Map(document.getElementById("map-plane"),myOptions);
        var flightPlanCoordinates = [
            new google.maps.LatLng(37.772323, -122.214897),
            new google.maps.LatLng(21.291982, -157.821856),
            new google.maps.LatLng(-18.142599, 178.431),
            new google.maps.LatLng(-27.46758, 153.027892)
        ];
        var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        flightPath.setMap(map);
    }
    

    //=====================================================================
    //************************GESTION DES SECTIONS*************************
    //=====================================================================
    $scope.afficherPage = function(page) {
        switch(page) {
            case "Index":
                $scope.pageIndex = true;
                $scope.pageCreate = false;
                $scope.pageModif = false;
                break;
                
            case "Create":
                $scope.pageIndex = false;
                $scope.pageCreate = true;
                $scope.pageModif = false;
                break;
                
            case "Modif":
                $scope.pageIndex = false;
                $scope.pageCreate = false;
                $scope.pageModif = true;
                break;
        }
    }
    
    
    //=====================================================================
    //**************************GESTION TRANSPORT**************************
    //=====================================================================
    
    //--------------------------------------------
    //**CREATE
    //--------------------------------------------
    $scope.createNewTransport = function() {
        
        //****Obtenir les coordonnées de l'activitéDepart.
        //****Obtenir les coordonnées de l'activitéArrivé.
        
        var newTransport = {
            cout: $scope.cout,
            type: $scope.type,
            transporteur: $scope.transporteur,
            latitudeDepart: -73.567543,
            longitudeDepart: 45.501459,
            latitudeArrive: -70,
            longitudeArrive: 45,
            jour_Id: $scope.jour
        }
        
        TransportsService.postTransport(newTransport);
    }

    //--------------------------------------------
    //***INDEX
    //--------------------------------------------
    //**Tous les transports
    $scope.getAllTransports = function() {
        TransportsService.getTransports();
    }
    
    //**Les transports du voyage selectionne
    $scope.getTransportsVoyage = function(voyageID) {
        //***bonne ligne de code, mais pour le développement je hardcode.
        //TransportsService.getTransportsVoyage(voyageID);
        TransportsService.getTransportsVoyage(0);
    }
    
    //--------------------------------------------
    //***MODIFIER
    //--------------------------------------------
    $scope.modifierTransport = function(transport) {
        
    }
    
    //--------------------------------------------
    //***SUPPRIMER
    //--------------------------------------------
    $scope.supprimerTransport = function(transport) {
        
    }
}







