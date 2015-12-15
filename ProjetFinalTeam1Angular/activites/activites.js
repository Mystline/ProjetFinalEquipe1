angular
    .module('projetequipe1')
    .controller('ActiviteController',['$scope', '$rootScope', '$http', '$route', '$sce',
 
function ActiviteController($scope, $rootScope, $http, $route, $sce) {
    $scope.HeureDebut = "";
    $scope.HeureFin = "";
    $scope.Cout = "";
    $scope.Cout = "";
    $scope.Latitude = "";
    $scope.Longitude = "";
    
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
                $scope.$apply();
            }).error(function (data) {
                console.log("erreur ajout activites");
            });
        }
    }
    
}]);
