angular
    .module('projetequipe1')
    .controller('ActiviteController',['$scope', '$rootScope', '$http', '$route', '$sce',
 
function ActiviteController($scope, $rootScope, $http, $route, $sce) 
{            
    
    
           scope.HeureDebut = "";
            $scope.HeureFin = "";
            $scope.Cout = "";
            $scope.activites = [];
    
    
 /*   $scope.ajouterActivites = function () {
                
         
                
                if ($scope.HeureDebut == "" || $scope.HeureFin == "" || $scope.Cout == "") {


                    alert("Un ou plusieurs champs ne sont pas valides");

                } else {
                    
                    var dt = new Date();
                    var dtstring = dt.getFullYear()
                    + '-' + pad2(dt.getMonth()+1)
                    + '-' + pad2(dt.getDate())
                    + ' ' + pad2(dt.getHours())
                    + ':' + pad2(dt.getMinutes())
                    + ':' + pad2(dt.getSeconds());
                    
                    console.log($scope.dateDebut,$scope.budgetVoyage,$scope.nbJours);
                    $.ajax({
                        method: 'POST',
                        url: "http://localhost:3216/api/Activites/",
                        data: {
                            HeureDebut: $scope.HeureDebut,
                            HeureFin: $scope.HeureFin,
                            Cout: $scope.Cout
                        }

                    }).success(function (data)  {
                        
                        console.log(data);
                        $scope.$apply();
                    }).error(function (data) {
                        
                        console.log("erreur ajout activites");
                    });
                }

            }
    
    function pad2(number) {
                return (number < 10 ? '0' : '') + number
            } */
    
}]);