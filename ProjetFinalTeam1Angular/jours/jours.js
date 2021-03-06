angular
    .module('projetequipe1')
    .controller('JourController',['$scope', '$rootScope', '$http', '$route', '$sce',  'GlobalService',
 
function JourController($scope, $rootScope, $http, $route, $sce, $compile, $timeout,  GlobalService) 
{
    
    $scope.budgetJour = 0;
    $scope.nbEvent = 0;
    
    $rootScope.JourSelect = "";
    
    $scope.GlobalService = GlobalService;
    
    $scope.lstJours = [];
    $rootScope.lstActivites = [];
    
    $scope.jourInfo = false;
    $scope.lstActivite = false;
    $scope.modifJour = false;
    $scope.modifJour = false;
    $scope.showDepassement = false;
    
    $scope.budgetTotal = 0;
    
    $scope.getJours = function() {
        
        console.log("voyage get jour");
        console.log($rootScope.voyageSelect);
        $scope.lstJours = [];
        $scope.budgetTotal = 0;
        
        $.ajax({
            method: 'GET',
            url: "http://localhost:3216/api/Jours/GetJoursVoyage?voyageId="+$rootScope.voyageSelect.Id,
            error: function (data) {
                console.log("Aucun jour de selectionner ou autre erreur")
            },
            success: function(response)
            {
                //console.log(response);        

                for(var i =0; i< response.length; i++)
                {
                    $scope.budgetTotal = $scope.budgetTotal + response[i].BudgetJournee;
                    var num = i+1;
                    $scope.lstJours.push({Num:num, Id:response[i].Id, Date:response[i].Date.split("T")[0]
                        , BudgetJournee:response[i].BudgetJournee, VoyageId:response[i].VoyageId})
                    
                    
                }
                $scope.calculerTotalBudget();
                console.log($scope.lstJours);
                $scope.$apply();
            }
        });

    }
    
    $scope.calculerTotalBudget = function()
    {
        $scope.showDepassement = false;
        var total = 0;
        for(var i = 0; i<$scope.lstJours.length;i++)
        {
            total = (total + $scope.lstJours[i].BudgetJournee);
            if(total > $rootScope.voyageSelect.BudgetVoyage)
            {
                $scope.showDepassement = true;
            }
        }
    }
    
    $scope.showJour = function(jour)
    {    
        $scope.jourInfo = true;
        $scope.lstActivite = false;
        $scope.modifJour = false;
        $scope.budgetJour = jour.BudgetJournee;
        $scope.nbEvent = 6;
        $rootScope.JourSelect = jour;       
    }
    
    $scope.showLstActivites = function()
    {
        $scope.lstActivite = true;          
    }
    
    
    $scope.selectionnerActivitie = function(){
         
        $rootScope.changeView('/activites');            
    }
    
    $scope.allowModif = function()
    {
        $scope.modifJour= true;
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

                $scope.jourInfo = false;
                $scope.budgetJour = response;
                $scope.getJours();
                $scope.$apply();
            }
        });
        $scope.modifJour = false;
        $scope.lstActivite = false;
        $scope.calculerTotalBudget;
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
    
    $scope.renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };
    
    $scope.getJours();
                                  
}]);