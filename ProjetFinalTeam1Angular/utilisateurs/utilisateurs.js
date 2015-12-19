angular
    .module('projetequipe1')
    .controller('UtilisateurController',['$scope', '$rootScope', '$http', '$route', '$sce', 'VoyagesService',
 
function UtilisateurController($scope, $rootScope, $http, $route, $sce, VoyagesService) 
{            
 

     $scope.voyages = [];
    
    $scope.users = [];
    $scope.voyageSelected = "";
    $scope.userSelected = "";
    
     $scope.voyageIdSelected = "";
    $scope.userIdSelected = "";
    $scope.selectionnerVoyage = function(voyage){
                $scope.voyageSelected = voyage.Nom;
                $scope.voyageIdSelected = voyage.Id;
            
            }
  
    $scope.selectionnerUser = function(user){
                $scope.userSelected = user.Email;
                $scope.userIdSelected = user.Id;
            
            }
    
    $scope.Partage = function() {
        
        if($scope.voyageSelected === "" ||$scope.userSelected === "")
        {
             alert("wrong user or voyage");
        }
        else
        $.ajax({
            method: 'GET',
            url: "http://localhost:3216/api/Voyages/GetPartage/",
            data:
            {
                userId: $scope.userIdSelected,
                voyageId:$scope.voyageIdSelected               
            },
            error: function (data) {
                console.log("Aucun user ou voyage selectionner")
            },
            success: function(response)
            {
            alert("success");  

            }
        });

    }
    
    //FIND ALL VOYAGE FROM DATABASE
    $scope.initVoyage = function()
    {
       
        var token = localStorage.getItem("token");
   
        $http({
            method: 'GET',
            url: "http://localhost:3216/api/Voyages/GetVoyagesDTO/",
            headers:{ Authorization: 'Bearer ' + token},
        }).success(function (response) {
            console.log(response);
            for(var i =0; i < response.length; i++)
                {
                     $scope.voyages.push({Id:response[i].Id, Nom:response[i].Name, BudgetVoyage: response[i].BudgetVoyage,
                                                  DateTimeDebut: response[i].DateTimeDebut.split('T')[0], NbDeJour: response[i].NbDeJour});
                }
        });       
    } 
    
    $scope.initUser = function()
    {
       var token = localStorage.getItem("token");
        
        $http({
            method: 'GET',
            url: "http://localhost:3216/api/Voyages/GetListUser",
             headers:{ Authorization: 'Bearer ' + token},
        }).success(function (response) {
            console.log(response);
            for(var i =0; i < response.length; i++)
                {
                   if($rootScope.activeUser != response[i].Email)
            $scope.users.push({Id:response[i].Id, Email:response[i].Email});
                }
        });       
    } 
    $scope.initUser();
    $scope.initVoyage();
    
}]);