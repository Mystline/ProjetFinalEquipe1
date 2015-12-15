angular
    .module('projetequipe1')
    .controller('JourController',['$scope', '$rootScope', '$http', '$route', '$sce',
 
function JourController($scope, $rootScope, $http, $route, $sce) 
{
    
    $scope.budgetJour = 0;
    $scope.nbEvent = 0;
    
    $rootScope.JourSelect = "";
    
    //rootScope ??
    $scope.lstJours = [];
    $rootScope.lstActivites = [];
    
    
    $scope.getJours = function() {
        
        console.log("voyage get jour");
        console.log($rootScope.voyageSelect);
        $scope.lstJours = [];
        
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
                
                $scope.lstJours.push({Id:response[i].Id, Date:response[i].Date.split("T")[0]
                    , BudgetJournee:response[i].BudgetJournee, VoyageId:response[i].VoyageId})
            }

            console.log($scope.lstJours);
            $scope.$apply();

        }
        });

    }
    
    $scope.showJour = function(jour)
    {    
        $('#jourInfo').show();
        $('#lstActivite').hide();
        $('#modifJour').hide();
        $scope.budgetJour = jour.BudgetJournee;
        $scope.nbEvent = 6;
        $rootScope.JourSelect = jour;       
    }
    
    $scope.showLstActivites = function()
    {
        $('#lstActivite').show();            
    }
    
    
    $scope.selectionnerActivitie = function(){
         
        console.log($rootScope.JourSelect);
        $rootScope.changeView('/activites');            
    }
    
    $scope.allowModif = function()
    {
        $('#modifJour').show();    
    }
    
    $scope.modifierBudgetJour = function()
    {
        console.log("show jour");
        console.log($rootScope.JourSelect);
        $.ajax({
            method: 'GET',
            url: "http://localhost:3216/api/Jours/GetBudget/",
            data:
            {
                id: $rootScope.JourSelect.Id,
                budget:$scope.newbudget               
            },  
                error: function (data) {
                console.log("Probleme modif journee")
            },
            success: function(response)
            {
                console.log(response);

                $('#jourInfo').hide();
                $scope.budgetJour = response;
                $scope.getJours();
                $scope.$apply();
            }
        });
        $('#modifJour').hide();
        $('#lstActivite').hide();
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
    
    function pad2(number) {
        return (number < 10 ? '0' : '') + number
    }   
    
    $scope.getJours();
                                  
}]);