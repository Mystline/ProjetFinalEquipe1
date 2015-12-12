angular
    .module('projetequipe1')
    .controller('JourController',['$scope', '$rootScope', '$http', '$route', '$sce',
 
function JourController($scope, $rootScope, $http, $route, $sce) 
{
    
    $rootScope.JourSelect = "";
    
    //rootScope ??
    $scope.lstJours = [];
    $rootScope.lstActivites = [];
    
    
    $scope.getJours = function() {
        
        console.log("voyage get jour");
        console.log($rootScope.voyageSelect);
        
    $.ajax({
        method: 'GET',
        url: "http://localhost:3216/api/Jours/GetJoursVoyage?voyageId="+$rootScope.voyageSelect.Id,
        error: function (data) {
            console.log("Aucun jour de selectionner ou autre erreur")
        },
        success: function(response)
        {
            console.log(response);                            

            for(var i =0; i< response.length; i++)
            {
                $scope.lstJours.push({Date:response[i].Date
                    , BudgetJournee:response[i].BudgetJournee, VoyageId:response[i].Voyage_Id})
            }

            console.log($scope.lstJours);
            $scope.$apply();

        }
        });

    }
      
    
    $scope.getActivities = function() {
    $.ajax({
        method: 'GET',
        url: "http://localhost:3216/api/Activites/GetActivitesJour",
        data:
        {
            Jour: $rootScope.JourSelect
        },
        error: function (data) {
            console.log("Aucune activite de selectionner ou autre erreur")
        },
        success: function(response)
        {
            console.log(response);
            for(var i =0; i< response.length; i++)
            {
                $rootScope.lstActivites.push({HeureDebut:response[i].HeureDebut,
                             HeureFin:response[i].HeureFin, Cout:response[i].Cout,
                             Latitude:response[i].latitude, Longitude:response[i].Longitude
                                                                    , Jour:response[i].Jour});
            }
            console.log($rootScope.lstActivites);
            $scope.$apply();
        }

        });
    }
    
    $scope.getJours();
                                  
}]);