angular
    .module('projetequipe1')
    .controller('JourController',['$scope', '$rootScope', '$http', '$route', '$sce',
 
function JourController($scope, $rootScope, $http, $route, $sce) 
{
    
    $rootScope.JourSelect = "";
    
    //rootScope ??
    $scope.lstJours = [];
    $scope.lstActivites = [];
    
    
    $scope.getJours(function() {
    $.ajax({
        method: 'GET',
        url: "http://localhost:3216/api/Jour/GetJours",
        data:
        {
            Jour: $rootScope.JourSelect,
        },
        error: function (data) {
            console.log("Aucun jour de selectionner ou autre erreur")
        }
    }).success(response)
    {
        console.log(response);                            
      
        for(var i =0; i< response.length; i++)
        {

        }
                                  
        console.log($scope.lstJours);
                                  
    }

    });
      
    
    $scope.getActivities(function() {
    $.ajax({
        method: 'GET',
        url: "http://localhost:3216/api/Activite/GetActivites",
        data:
        {
            Jour: $rootScope.VoyageSelect,
        },
        error: function (data) {
            console.log("Aucune activite de selectionner ou autre erreur")
        }
    }).success(response)
    {
        console.log(response);
        for(var i =0; i< response.length; i++)
        {

        }
        console.log($scope.lstActivites);
    }

    });
                                  
}]);