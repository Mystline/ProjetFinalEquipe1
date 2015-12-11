angular
    .module('projetequipe1')
    .controller('VoyageController', ['$scope', '$rootScope', '$http', '$route', '$sce',

function VoyageController($scope, $rootScope, $http, $route, $sce)
        {

            $scope.budgetVoyage = "";
            $scope.dateDebut = "";
            $scope.nbJours = "";
            $scope.voyages = [];
/*
            $http({
                method: 'GET',
                url: "http://localhost:59044/api/Voyages"
            }).success(function (data) {
                console.log(data)
                $scope.voyages = data;
            });*/

            $scope.ajouterVoyage = function () {
                if ($scope.budgetVoyage == "" || $scope.dateDebut == "" || $scope.nbJours == "") {


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
                        url: "http://localhost:3216/api/Voyages/",
                        data: {
                            BudgetVoyage: $scope.budgetVoyage,
                            DateTimeDebut: dtstring,
                            NbDeJour: $scope.nbJours
                        }

                    }).success(function (data)  {
                        $scope.voyages.push({BudgetVoyage: $scope.budgetVoyage, DateTimeDebut: dtstring, NbDeJour: $scope.nbJours});
                        console.log(data)
                    });
                }

            }
            
            $scope.selectionnerVoyage = function(voyage){
            $rootScope.voyageSelect = voyage;
            $rootScope.changeView('/jours'); 
            
            }

            $scope.supprimerVoyage = function (voyage) {
                $http({
                    method: 'DELETE',
                    url: "http://localhost:3216/api/Voyages/" + voyage.Id

                }).success(function (data) {
                    console.log(data);
                    $scope.voyageIndexASupprimer = $scope.voyageIndex($scope.voyages, voyage);
                    $rootScope.data.memos.splice($scope.voyageIndexASupprimer, 1);
                });

            }

            $scope.voyageIndex = function arrayObjectIndexOf(arr, obj) {
                for (var i = 0; i < arr.length; i++) {
                    if (angular.equals(arr[i], obj)) {
                        return i;
                    }
                };
                return -1;
            }
            
            
            function pad2(number) {
                return (number < 10 ? '0' : '') + number
            }   


}]);